// src/app.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

class CreateUserDto {
  name!: string;
  email!: string;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: 'ユーザー一覧を取得' })
  @ApiResponse({ status: 200, description: 'ユーザーの配列を返す' })
  getAll() {
    return [{ id: 1, name: 'Taro', email: 'taro@example.com' }];
  }

  @Get(':id')
  @ApiOperation({ summary: 'ユーザー詳細を取得' })
  @ApiResponse({ status: 200, description: '指定IDのユーザーを返す' })
  getById(@Param('id') id: string) {
    return { id, name: 'Taro', email: 'taro@example.com' };
  }

  @Post()
  @ApiOperation({ summary: 'ユーザーを作成' })
  @ApiResponse({ status: 201, description: '作成したユーザーを返す' })
  create(@Body() dto: CreateUserDto) {
    return { id: 2, ...dto };
  }
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'ヘルスチェック' })
  @ApiResponse({ status: 200, description: 'サービス稼働状況を返す' })
  check() {
    return { status: 'ok' };
  }
}
