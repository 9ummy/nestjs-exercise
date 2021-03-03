import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
    
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    // @Post()
    // createTask(@Body() body) {}
    // // 첫 번째 방법
    
    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string,
    // ): Task {
    //     return this.tasksService.createTask(title, description); 
    // }
    // // 두 번째 방법: 구체적인 key 값을 적을 수 있음

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto); 
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
        ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}