import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { ReadNotificationDto } from './dto/read-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationService } from './notification.service';

/**
 * Controller for managing notifications.
 */
@ApiTags('Management of all action notifications')
@Controller('notifications')
@UsePipes(new ValidationPipe({ transform: true }))
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    /**
     * Creates a new notification.
     * @param createNotificationDto The DTO containing data for the new notification.
     * @returns The created notification.
     */
    @Post()
    @ApiOperation({ summary: 'Create a new notification', description: 'Creates a new notification entry in the system.' })
    @ApiBody({ type: CreateNotificationDto, description: 'Data for creating a new notification' })
    @ApiResponse({ status: 201, description: 'The notification has been successfully created.', type: ReadNotificationDto })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createNotificationDto: CreateNotificationDto): Promise<ReadNotificationDto> {
        return this.notificationService.create(createNotificationDto);
    }

    /**
     * Retrieves all notifications or filters them based on query parameters.
     * @param query The DTO containing query parameters for filtering notifications.
     * @returns A list of notifications.
     */
    @Get()
    @ApiOperation({ summary: 'Retrieve all notifications', description: 'Fetches all notifications, with optional filtering based on query parameters.' })
    @ApiQuery({ type: QueryNotificationDto, description: 'Query parameters for filtering notifications', required: false })
    @ApiResponse({ status: 200, description: 'Successfully retrieved notifications.', type: [ReadNotificationDto] })
    async findAll(@Query() query: QueryNotificationDto): Promise<ReadNotificationDto[]> {
        return this.notificationService.findAll(query);
    }

    /**
     * Retrieves a single notification by its ID.
     * @param id The ID of the notification to retrieve.
     * @returns The notification with the specified ID.
     */
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a notification by ID', description: 'Fetches a single notification by its unique identifier.' })
    @ApiParam({ name: 'id', description: 'The ID of the notification', type: 'number' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved notification.', type: ReadNotificationDto })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    async findOne(@Param('id') id: number): Promise<ReadNotificationDto> {
        return this.notificationService.findOne(id);
    }

    /**
     * Updates an existing notification.
     * @param id The ID of the notification to update.
     * @param updateNotificationDto The DTO containing data for updating the notification.
     * @returns The updated notification.
     */
    @Patch(':id')
    @ApiOperation({ summary: 'Update a notification by ID', description: 'Updates an existing notification entry in the system.' })
    @ApiParam({ name: 'id', description: 'The ID of the notification', type: 'number' })
    @ApiBody({ type: UpdateNotificationDto, description: 'Data for updating the notification' })
    @ApiResponse({ status: 200, description: 'The notification has been successfully updated.', type: ReadNotificationDto })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async update(@Param('id') id: number, @Body() updateNotificationDto: UpdateNotificationDto): Promise<ReadNotificationDto> {
        return this.notificationService.update(id, updateNotificationDto);
    }

}