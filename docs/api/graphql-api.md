---
sidebar_position: 40
---

# GraphQL API

Flexmodel 自动为每个数据模型生成 GraphQL API，提供类型安全的查询和变更操作。

## 基础信息

- **端点**: `/graphql`
- **内容类型**: `application/json`
- **认证方式**: JWT Token（在请求头中）

## 认证

在请求头中包含 JWT Token：

```
Authorization: Bearer <your-jwt-token>
```

## 查询操作

### 获取单条记录

```graphql
query {
  student(id: "1") {
    id
    studentName
    age
    gender
    createdAt
  }
}
```

### 获取记录列表

```graphql
query {
  students {
    id
    studentName
    age
    gender
    createdAt
  }
}
```

### 带条件的查询

```graphql
query {
  students(where: {age: {_gte: 18}}) {
    id
    studentName
    age
    gender
  }
}
```

### 分页查询

```graphql
query {
  students(
    page: {current: 1, pageSize: 10}
    sort: [{field: "createdAt", direction: DESC}]
  ) {
    total
    list {
      id
      studentName
      age
      gender
    }
  }
}
```

### 聚合查询

```graphql
query {
  studentsAggregate(where: {age: {_gte: 18}}) {
    count
    avg {
      age
    }
    sum {
      age
    }
    min {
      age
    }
    max {
      age
    }
  }
}
```

### 关联查询

```graphql
query {
  students {
    id
    studentName
    age
    studentClass {
      id
      className
      classCode
    }
  }
}
```

## 变更操作

### 创建记录

```graphql
mutation {
  createStudent(
    input: {
      studentName: "张三"
      age: 18
      gender: MALE
      classId: 1
    }
  ) {
    id
    studentName
    age
    gender
    createdAt
  }
}
```

### 更新记录

```graphql
mutation {
  updateStudent(
    id: "1"
    input: {
      studentName: "张三（已更新）"
      age: 19
    }
  ) {
    id
    studentName
    age
    updatedAt
  }
}
```

### 删除记录

```graphql
mutation {
  deleteStudent(id: "1") {
    id
    studentName
  }
}
```

### 批量删除

```graphql
mutation {
  deleteStudents(where: {age: {_lt: 18}}) {
    count
  }
}
```

## 查询条件

GraphQL 查询支持与 REST API 相同的查询条件语法：

### 比较操作

```graphql
query {
  students(where: {
    age: {_gte: 18, _lte: 25}
    gender: {_eq: MALE}
  }) {
    id
    studentName
    age
  }
}
```

### 字符串搜索

```graphql
query {
  students(where: {
    studentName: {_contains: "张"}
  }) {
    id
    studentName
  }
}
```

### 逻辑操作

```graphql
query {
  students(where: {
    _or: [
      {age: {_gte: 18}},
      {gender: {_eq: FEMALE}}
    ]
  }) {
    id
    studentName
    age
    gender
  }
}
```

### 集合操作

```graphql
query {
  students(where: {
    status: {_in: [ACTIVE, PENDING]}
  }) {
    id
    studentName
    status
  }
}
```

## 分页和排序

### 分页

```graphql
query {
  students(
    page: {
      current: 1
      pageSize: 10
    }
  ) {
    total
    list {
      id
      studentName
    }
  }
}
```

### 排序

```graphql
query {
  students(
    sort: [
      {field: "age", direction: DESC},
      {field: "studentName", direction: ASC}
    ]
  ) {
    id
    studentName
    age
  }
}
```

## 字段选择

GraphQL 允许精确选择需要的字段：

```graphql
query {
  students {
    id
    studentName
    # 不选择 age 和 gender 字段
  }
}
```

## 嵌套查询

### 一对多关系

```graphql
query {
  classes {
    id
    className
    students {
      id
      studentName
      age
    }
  }
}
```

### 多对一关系

```graphql
query {
  students {
    id
    studentName
    studentClass {
      id
      className
      teacher {
        id
        name
      }
    }
  }
}
```

## 变量使用

使用 GraphQL 变量可以构建动态查询：

```graphql
query GetStudents($minAge: Int, $gender: UserGender) {
  students(where: {
    age: {_gte: $minAge}
    gender: {_eq: $gender}
  }) {
    id
    studentName
    age
    gender
  }
}
```

变量值：

```json
{
  "minAge": 18,
  "gender": "MALE"
}
```

## 错误处理

GraphQL 响应包含 `errors` 字段用于错误处理：

```json
{
  "data": null,
  "errors": [
    {
      "message": "Field 'invalidField' doesn't exist on type 'Student'",
      "locations": [
        {
          "line": 3,
          "column": 5
        }
      ],
      "path": ["students", "invalidField"]
    }
  ]
}
```

## 内省查询

使用 GraphQL 内省功能查看 Schema：

```graphql
query {
  __schema {
    types {
      name
      fields {
        name
        type {
          name
        }
      }
    }
  }
}
```

## 完整示例

### 复杂查询示例

```graphql
query GetStudentStatistics($minAge: Int, $classId: Int) {
  # 获取学生列表
  students(
    where: {
      _and: [
        {age: {_gte: $minAge}},
        {classId: {_eq: $classId}}
      ]
    }
    page: {current: 1, pageSize: 20}
    sort: [{field: "age", direction: DESC}]
  ) {
    total
    list {
      id
      studentName
      age
      gender
      studentClass {
        id
        className
        classCode
      }
    }
  }
  
  # 获取统计信息
  studentsAggregate(
    where: {
      _and: [
        {age: {_gte: $minAge}},
        {classId: {_eq: $classId}}
      ]
    }
  ) {
    count
    avg {
      age
    }
    min {
      age
    }
    max {
      age
    }
  }
}
```

### 批量操作示例

```graphql
mutation BatchUpdateStudents($ids: [String!]!, $updates: StudentUpdateInput!) {
  updateStudents(ids: $ids, input: $updates) {
    id
    studentName
    age
    updatedAt
  }
}
```

## 最佳实践

1. **字段选择**: 只选择需要的字段以提高性能
2. **分页**: 对大量数据使用分页查询
3. **缓存**: 利用 GraphQL 的缓存机制
4. **错误处理**: 始终处理可能的错误情况
5. **类型安全**: 使用强类型语言客户端以获得更好的开发体验

## 工具支持

### GraphiQL

访问 `/graphiql` 可以使用 GraphiQL 交互式查询工具。

### 客户端库

推荐使用以下 GraphQL 客户端库：

- **JavaScript/TypeScript**: Apollo Client, Relay
- **Java**: Apollo Android, GraphQL Java
- **Python**: GQL, Python GraphQL Client
- **Go**: Machinebox GraphQL
