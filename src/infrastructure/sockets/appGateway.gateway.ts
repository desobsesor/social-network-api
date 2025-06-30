import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { UsersService } from "src/domains/users/users.service";

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Map to store connected users
  private connectedUsers: Map<string, { id: string, username: string }> = new Map();

  constructor(
    private readonly userService: UsersService,
  ) { }

  /**
   * This method is called after the gateway has been initialized.
   * It sets up an interval to fetch live rankings every 10 seconds and emit them to all connected clients.
   * @param server The server instance.
   * @returns void
   * @memberof AppGateway
   * @example
   * 
   * */
  afterInit(server: Server) {
    // Broadcast list of connected users every 10 seconds
    /* setInterval(() => {
      this.sendActiveUsers();
    }, 10000); */
  }

  /**
   * This method is called when a client connects to the gateway.
   * @param client The client instance.
   * @returns void
   * @memberof AppGateway
   */
  async handleConnection(client: Socket) {
    console.log(`Cliente data conectado: ${JSON.stringify(client.data)}`);
    // When a client connects, we expect it to identify itself
    this.connectedUsers.set(client.id, { id: client.id, username: '' });

    const listUsers: any[] = await this.userService.findAll();
    const activeUsers = listUsers.filter(user => user.isLogged);

    this.server.emit('users-update', activeUsers);
  }

  /**
  * This method is called when a client disconnects from the gateway.
  * Removes the user from the connected list and issues the update.
  * @param client The client instance.
  * @returns void
  * @memberof AppGateway
  */
  handleDisconnect(client: Socket) {
    // Remove user from map when disconnected
    if (this.connectedUsers.has(client.id)) {
      this.connectedUsers.delete(client.id);
      this.emitUsersUpdate();
      console.log(`Cliente desconectado: ${client.id}`);
    }
  }

  /**
   * This method outputs the updated list of connected users to all clients.
   * @returns void
   * @memberof AppGateway
   */
  private async emitUsersUpdate() {
    const users = Array.from(this.connectedUsers.values());

    const listUsers: any[] = await this.userService.findAll();

    const activeUsers = listUsers.filter(user => user.isLogged);

    this.server.emit('users-update', activeUsers);
  }

  /**
   * This method retrieves and outputs the list of active users to all connected clients.
   * It can be called periodically or manually to force a refresh.
   * @returns void
   * @memberof AppGateway
   */
  public sendActiveUsers() {
    const users = Array.from(this.connectedUsers.values());
    console.log(`Emitiendo actualización de usuarios: ${users.length} usuarios conectados`);
    // Verify that the server is initialized before issuing
    if (this.server) {
      // We emit the event with the list of users
      this.server.emit('users-update', users);

      // We also emit a status event to confirm that the server is up
      this.server.emit('server-status', { active: true, connectedUsers: users.length });
    } else {
      console.error('Error: El servidor WebSocket no está inicializado');
    }
  }

  /**
   * This method handles the request to update the logged-in users.
   * When a client requests the updated list of users, it is broadcast to all clients.
   * @param client The client instance.
   * @returns void
   * @memberof AppGateway
   */
  @SubscribeMessage('requestUsersUpdate')
  handleUsersUpdateRequest(client: Socket) {
    console.log(`Cliente ${client.id} solicitó actualización de usuarios`);
    this.sendActiveUsers();
  }

  /**
   * This method handles the user's identification upon connection.
   * Registers the user in the connection list and issues the update.
   * @param client The client instance.
   * @param userData The user data (ID and username).
   * @returns void
   * @memberof AppGateway
   */
  @SubscribeMessage('identifyUser')
  handleUserIdentification(client: Socket, userData: { id: string, username: string }) {
    // Register user in the map of connected users
    this.connectedUsers.set(client.id, userData);
    this.emitUsersUpdate();

    // Send the current list of connected users to the newly identified client
    console.log(`Login to users-update with username: ${userData.username}`);
    client.emit('users-update', Array.from(this.connectedUsers.values()));
  }

}