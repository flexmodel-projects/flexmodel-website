---
sidebar_position: 30
---

# REST API

Flexmodel 提供了完整的 REST API，用于管理数据模型、数据记录和系统配置。

## 基础信息

- **基础路径**: `/api/v1`
- **内容类型**: `application/json`
- **认证方式**: JWT Token

## 认证

大部分 API 需要认证，请在请求头中包含 JWT Token：

```
Authorization: Bearer <your-jwt-token>
```

## 数据源管理

### 获取数据源列表

```http
GET /api/v1/datasources
```

**响应示例**:

```json
[
  {
    "name": "mysql-db",
    "type": "MYSQL",
    "config": {
      "host": "localhost",
      "port": 3306,
      "database": "test",
      "username": "root",
      "password": "password"
    },
    "enabled": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
]
```

### 创建数据源

```http
POST /api/v1/datasources
```

**请求体**:

```json
{
  "name": "mysql-db",
  "type": "MYSQL",
  "config": {
    "host": "localhost",
    "port": 3306,
    "database": "test",
    "username": "root",
    "password": "password"
  }
}
```

### 更新数据源

```http
PUT /api/v1/datasources/{datasourceName}
```

### 删除数据源

```http
DELETE /api/v1/datasources/{datasourceName}
```

### 测试数据源连接

```http
POST /api/v1/datasources/{datasourceName}/test
```

## 模型管理

### 获取模型列表

```http
GET /api/v1/datasources/{datasourceName}/models
```

**响应示例**:

```json
[
  {
    "type": "ENTITY",
    "name": "Student",
    "comment": "学生信息",
    "fields": [
      {
        "name": "id",
        "type": "String",
        "identity": true,
        "unique": true,
        "nullable": false,
        "modelName": "Student",
        "defaultValue": { "name": "uuid" }
      },
      {
        "name": "studentName",
        "type": "String",
        "length": 255,
        "unique": false,
        "nullable": true,
        "modelName": "Student"
      }
    ],
    "indexes": []
  }
]
```

### 获取单个模型

```http
GET /api/v1/datasources/{datasourceName}/models/{modelName}
```

### 创建模型

```http
POST /api/v1/datasources/{datasourceName}/models
```

**请求体**:

```json
{
  "type": "ENTITY",
  "name": "Student",
  "comment": "学生信息",
  "fields": [
    {
      "name": "id",
      "type": "String",
      "identity": true,
      "unique": true,
      "nullable": false,
      "defaultValue": { "name": "uuid" }
    },
    {
      "name": "studentName",
      "type": "String",
      "length": 255,
      "nullable": true
    }
  ]
}
```

### 更新模型

```http
PUT /api/v1/datasources/{datasourceName}/models/{modelName}
```

### 删除模型

```http
DELETE /api/v1/datasources/{datasourceName}/models/{modelName}
```

## 数据记录管理

### 获取记录列表（分页）

```http
GET /api/v1/datasources/{datasourceName}/models/{modelName}/records
```

**查询参数**:

| 参数 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `current` | Integer | 当前页码 | 1 |
| `pageSize` | Integer | 每页大小 | 15 |
| `filter` | String | 查询条件（JSON格式） | - |
| `sort` | String | 排序条件（JSON格式） | - |
| `nestedQuery` | Boolean | 是否开启嵌套查询 | false |

**响应示例**:

```json
{
  "total": 100,
  "list": [
    {
      "id": "1",
      "studentName": "张三",
      "age": 18,
      "gender": "MALE",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ]
}
```

### 获取单条记录

```http
GET /api/v1/datasources/{datasourceName}/models/{modelName}/records/{id}
```

**查询参数**:

| 参数 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `nestedQuery` | Boolean | 是否开启嵌套查询 | false |

### 创建记录

```http
POST /api/v1/datasources/{datasourceName}/models/{modelName}/records
```

**请求体**:

```json
{
  "studentName": "张三",
  "age": 18,
  "gender": "MALE",
  "classId": 1
}
```

### 更新记录

```http
PUT /api/v1/datasources/{datasourceName}/models/{modelName}/records/{id}
```

**请求体**:

```json
{
  "studentName": "张三（已更新）",
  "age": 19
}
```

### 删除记录

```http
DELETE /api/v1/datasources/{datasourceName}/models/{modelName}/records/{id}
```

### 批量删除记录

```http
DELETE /api/v1/datasources/{datasourceName}/models/{modelName}/records
```

**查询参数**:

| 参数 | 类型 | 描述 |
|------|------|------|
| `filter` | String | 删除条件（JSON格式） |

## API 定义管理

### 获取 API 定义列表

```http
GET /api/v1/api-definitions
```

### 创建 API 定义

```http
POST /api/v1/api-definitions
```

**请求体**:

```json
{
  "name": "获取学生列表",
  "type": "API",
  "method": "GET",
  "path": "/students",
  "modelName": "Student",
  "datasourceName": "mysql-db",
  "filter": "{\"status\":{\"_eq\":\"active\"}}",
  "sort": "[{\"field\":\"createdAt\",\"direction\":\"DESC\"}]"
}
```

### 更新 API 定义

```http
PUT /api/v1/api-definitions/{id}
```

### 删除 API 定义

```http
DELETE /api/v1/api-definitions/{id}
```

## 系统管理

### 获取系统概览

```http
GET /api/v1/overview
```

**响应示例**:

```json
{
  "datasourceCount": 5,
  "modelCount": 20,
  "recordCount": 1000,
  "apiCount": 15
}
```

### 获取系统设置

```http
GET /api/v1/settings
```

### 更新系统设置

```http
PUT /api/v1/settings
```

### 获取 API 日志

```http
GET /api/v1/api-logs
```

**查询参数**:

| 参数 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `current` | Integer | 当前页码 | 1 |
| `pageSize` | Integer | 每页大小 | 15 |
| `startTime` | String | 开始时间 | - |
| `endTime` | String | 结束时间 | - |
| `method` | String | HTTP方法 | - |
| `path` | String | 请求路径 | - |
| `status` | Integer | 响应状态码 | - |

## 错误处理

API 使用标准的 HTTP 状态码，错误响应格式如下：

```json
{
  "code": 400,
  "message": "Bad Request",
  "details": "Invalid filter format"
}
```

### 常见状态码

| 状态码 | 描述 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 查询条件示例

### 基础查询

```bash
# 查询所有学生
GET /api/v1/datasources/mysql-db/models/Student/records

# 查询年龄大于18的学生
GET /api/v1/datasources/mysql-db/models/Student/records?filter={"age":{"_gt":18}}

# 查询姓张的学生
GET /api/v1/datasources/mysql-db/models/Student/records?filter={"studentName":{"_contains":"张"}}

# 分页查询
GET /api/v1/datasources/mysql-db/models/Student/records?current=1&pageSize=10

# 排序查询
GET /api/v1/datasources/mysql-db/models/Student/records?sort=[{"field":"age","direction":"DESC"}]
```

### 复杂查询

```bash
# 多条件查询
GET /api/v1/datasources/mysql-db/models/Student/records?filter={"$and":[{"age":{"_gte":18}},{"gender":{"_eq":"MALE"}}]}

# 范围查询
GET /api/v1/datasources/mysql-db/models/Student/records?filter={"age":{"_between":[18,25]}}

# 枚举值查询
GET /api/v1/datasources/mysql-db/models/Student/records?filter={"status":{"_in":["ACTIVE","PENDING"]}}
```

## 嵌套查询

启用嵌套查询可以获取关联数据：

```bash
# 查询学生及其班级信息
GET /api/v1/datasources/mysql-db/models/Student/records?nestedQuery=true
```

响应示例：

```json
{
  "total": 1,
  "list": [
    {
      "id": "1",
      "studentName": "张三",
      "age": 18,
      "classId": 1,
      "studentClass": {
        "id": "1",
        "className": "计算机科学1班",
        "classCode": "CS001"
      }
    }
  ]
}
```
