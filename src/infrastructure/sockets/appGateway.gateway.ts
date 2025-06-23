import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { UsersService } from "src/domains/users/users.service";

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Mapa para almacenar los usuarios conectados
  private connectedUsers: Map<string, { id: string, username: string }> = new Map();

  constructor(
    private readonly userService: UsersService,
  ) { }

  /**
   * This method is called after the gateway has been initialized.
   * It sets up an interval to fetch live rankings every 5 seconds and emit them to all connected clients.
   * @param server The server instance.
   * @returns void
   * @memberof AppGateway
   * @example
   * appGateway.afterInit(server);
   * */
  afterInit(server: Server) {
    // Emitir lista de usuarios conectados cada 10 segundos
    /* setInterval(() => {
      this.sendActiveUsers();
    }, 10000); */
  }

  /**
   * Este método se llama cuando un cliente se conecta al gateway.
   * @param client La instancia del cliente.
   * @returns void
   * @memberof AppGateway
   */
  async handleConnection(client: Socket) {
    console.log(`Cliente data conectado: ${JSON.stringify(client.data)}`);
    // Cuando un cliente se conecta, esperamos que se identifique
    this.connectedUsers.set(client.id, { id: client.id, username: '' });

    const users = Array.from(this.connectedUsers.values());

    const listUsers: any[] = await this.userService.findAll();

    const activeUsers = listUsers.filter(user => user.isLogged);

    this.server.emit('users-update', activeUsers);
    //client.emit('server-status', { id: client.id });
    // Emitir la lista actual de usuarios conectados
    // Emitimos directamente al cliente que se acaba de conectar
    //client.emit('connection-established', { id: client.id });
    // Emitimos a todos los clientes la lista actualizada
    //this.emitUsersUpdate();
    // También enviamos la lista de usuarios activos
    //this.sendActiveUsers();
  }

  /**
   * Este método se llama cuando un cliente se desconecta del gateway.
   * Elimina al usuario de la lista de conectados y emite la actualización.
   * @param client La instancia del cliente.
   * @returns void
   * @memberof AppGateway
   */
  handleDisconnect(client: Socket) {
    // Eliminar usuario del mapa cuando se desconecta
    if (this.connectedUsers.has(client.id)) {
      this.connectedUsers.delete(client.id);
      this.emitUsersUpdate();
      console.log(`Cliente desconectado: ${client.id}`);
    }
  }

  /**
   * Este método emite la lista actualizada de usuarios conectados a todos los clientes.
   * @returns void
   * @memberof AppGateway
   */
  /**
   * Este método emite la lista actualizada de usuarios conectados a todos los clientes.
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
   * Este método obtiene y emite la lista de usuarios activos a todos los clientes conectados.
   * Puede ser llamado periódicamente o manualmente para forzar una actualización.
   * @returns void
   * @memberof AppGateway
   */
  public sendActiveUsers() {
    const users = Array.from(this.connectedUsers.values());

    console.log(`Emitiendo actualización de usuarios: ${users.length} usuarios conectados`);

    // Verificamos que el servidor esté inicializado antes de emitir
    if (this.server) {
      // Emitimos el evento con la lista de usuarios
      this.server.emit('users-update', users);

      // También emitimos un evento de estado para confirmar que el servidor está activo
      this.server.emit('server-status', { active: true, connectedUsers: users.length });
    } else {
      console.error('Error: El servidor WebSocket no está inicializado');
    }
  }

  /**
   * Este método maneja la solicitud de actualización de usuarios conectados.
   * Cuando un cliente solicita la lista actualizada de usuarios, se emite a todos los clientes.
   * @param client La instancia del cliente.
   * @returns void
   * @memberof AppGateway
   */
  @SubscribeMessage('requestUsersUpdate')
  handleUsersUpdateRequest(client: Socket) {
    console.log(`Cliente ${client.id} solicitó actualización de usuarios`);
    this.sendActiveUsers();
  }

  /**
   * Este método maneja la identificación del usuario cuando se conecta.
   * Registra al usuario en la lista de conectados y emite la actualización.
   * @param client La instancia del cliente.
   * @param userData Los datos del usuario (id y username).
   * @returns void
   * @memberof AppGateway
   */
  @SubscribeMessage('identifyUser')
  handleUserIdentification(client: Socket, userData: { id: string, username: string }) {
    // Registrar usuario en el mapa de usuarios conectados
    this.connectedUsers.set(client.id, userData);
    this.emitUsersUpdate();

    // Enviar la lista actual de usuarios conectados al cliente que se acaba de identificar
    console.log(`Login to users-update with username: ${userData.username}`);
    client.emit('users-update', Array.from(this.connectedUsers.values()));
  }

}