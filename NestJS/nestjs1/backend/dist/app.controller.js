"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
    name;
    email;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Taro', description: 'ユーザー名だばさ' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'taro@example.com', description: 'Email' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
let UsersController = class UsersController {
    getAll() {
        return [{ id: 1, name: 'Taro', email: 'taro@example.com' }, { id: 2, name: 'Hanako', email: 'hanako@example.com' }];
    }
    getById(id) {
        return { id, name: 'Taro', email: 'taro@example.com' };
    }
    create(dto) {
        return { id: 2, ...dto };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'ユーザー aa 一覧を取得' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'ユーザーの配列を返す' }),
    (0, swagger_1.ApiResponse)({ status: 300, description: '失敗じゃ' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ユーザー詳細を取得' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '指定IDのユーザーを返す' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'ユーザーを作成' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '作成したユーザーを返す' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users')
], UsersController);
let HealthController = class HealthController {
    check() {
        return { status: 'ok' };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'ヘルスチェック' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'サービス稼働状況を返す' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health')
], HealthController);
//# sourceMappingURL=app.controller.js.map