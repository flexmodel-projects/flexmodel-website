---
sidebar_position: 21
---
# Model Schema

## 简介

Flexmodel框架采用JSON格式定义模型，此文档为Schema定义描述。

## 对象配置

对象分为三种，entity、enum和native_query，实体对应数据库物理表，enum为枚举类型，native_query为本地查询。

对象包含以下公共属性：

| 属性                   | 类型     | 可选属性 | 描述         |
|----------------------|--------|------|------------|
| name                 | String | 否    | 对象名称       |
| comment              | String | 是    | 注释         |
| type                 | String | 否    | 对象类型       |
| additionalProperties | Object | 是    | 其他属性，可用于扩展 |

下文将介绍不通类型对象专有属性

### 实体描述

实体包含字段和索引两部分：

| 属性      | 类型    | 可选属性 | 描述   |
|---------|-------|------|------|
| fields  | Array | 否    | 字段列表 |
| indexes | Array | 是    | 索引列表 |

1. 字段描述

目前支持以下类型：

| 名称       | 描述                         |  
|----------|----------------------------|  
| id       | 唯一标识符，通常用于区分不同记录。          |  
| string   | 字符串类型，用于存储文本数据。            |  
| text     | 文本类型，适用于存储大量文本信息。          |  
| decimal  | 精确的小数类型，常用于财务数据。           |  
| int      | 整数类型，通常用于存储整数值。            |  
| bigint   | 大整数类型，适用于存储超出标准整数范围的值。     |  
| boolean  | 布尔类型，仅能存储真（true）或假（false）。 |  
| datetime | 日期时间类型，用于存储日期和时间信息。        |  
| date     | 日期类型，仅用于存储日期，不包含时间。        |  
| json     | JSON格式，用于存储结构化数据。          |  
| enum     | 枚举类型，定义一组有限的可能值。           |  
| relation | 关系类型，表示与数据的关联。             |  

字段包含以下公共属性：

| 属性                   | 类型      | 可选属性 | 描述             |
|----------------------|---------|------|----------------|
| name                 | String  | 否    | 对象名称           |
| comment              | String  | 是    | 注释             |
| type                 | String  | 否    | 对象类型           |
| unique               | Boolean | 是    | 是否唯一，默认值为false |
| nullable             | Boolean | 是    | 可为空，默认值为true   |
| defaultValue         | Any     | 是    | 默认值            |
| additionalProperties | Object  | 是    | 其他属性，可用于扩展     |

以下为各种类型字段的专有属性：

**id**

| 属性             | 类型     | 可选属性 | 描述                                                                                                       |
  |----------------|--------|------|----------------------------------------------------------------------------------------------------------|
| generatedValue | String | 否    | 可配置`AUTO_INCREMENT`\|`UUID`\|`ULID`\|`BIGINT_NOT_GENERATED`\|`STRING_NOT_GENERATED`，默认值为`AUTO_INCREMENT` |

**string**

| 属性     | 类型     | 可选属性 | 描述         |
|--------|--------|------|------------|
| length | Number | 是    | 长度，默认值为255 |

**text**

| 属性 | 类型 | 可选属性 | 描述 |
    |----|----|------|----|

**decimal**

| 属性        | 类型     | 可选属性 | 描述          |
    |-----------|--------|------|-------------|
| precision | Number | 是    | 数据长度，默认值为20 |
| scale     | Number | 是    | 小数长度，默认值为2  |

**int**

| 属性 | 类型 | 可选属性 | 描述 |
|----|----|------|----|

**bigint**

| 属性 | 类型 | 可选属性 | 描述 |
|----|----|------|----|

**boolean**

| 属性 | 类型 | 可选属性 | 描述 |
|----|----|------|----|

**datetime**

| 属性             | 类型     | 可选属性 | 描述                                                                       |
|----------------|--------|------|--------------------------------------------------------------------------|
| generatedValue | String | 是    | 生成当前日期时间，可配置`NOW_ON_CREATE`\|`NOW_ON_UPDATE`\|`NOW_ON_CREATE_AND_UPDATE` |

**date**

| 属性             | 类型     | 可选属性 | 描述                                                                     |
|----------------|--------|------|------------------------------------------------------------------------|
| generatedValue | String | 是    | 生成当前日期，可配置`NOW_ON_CREATE`\|`NOW_ON_UPDATE`\|`NOW_ON_CREATE_AND_UPDATE` |

**json**

| 属性 | 类型 | 可选属性 | 描述 |
|----|----|------|----|

**enum**

| 属性       | 类型      | 可选属性 | 描述              |
|----------|---------|------|-----------------|
| multiple | Boolean | 是    | 是否多条，默认值为false  |
| from     | String  | 否    | 枚举从哪里来，从枚举定义中获取 |

**relation**

| 属性            | 类型      | 可选属性 | 描述                                 |
|---------------|---------|------|------------------------------------|
| multiple      | Boolean | 否    | 是否多条，默认值为false                     |
| from          | String  | 否    | 数据从哪里来，从实体定义中获取                    |
| localField    | String  | 否    | 本地字段                               |
| foreignField  | String  | 否    | 外键字段                               |
| cascadeDelete | Boolean | 是    | 级联删除，控制删除当前数据时是否删除关联数据，默认值为`false` |

2. 索引描述

| 属性        | 父属性       | 类型      | 可选属性 | 描述                           |
|-----------|-----------|---------|------|------------------------------|
| name      | -         | String  | 否    | 索引名称                         |
| unique    | -         | Boolean | 是    | 是否唯一，默认值false                |
| fields    | -         | Array   | 否    | 索引字段                         |
| fieldName | fields[n] | Boolean | 否    | 字段名称                         |
| direction | fields[n] | String  | 否    | 排序方式，`ASC`\|`DESC`，默认值`DESC` |

**配置示例：**
<details>  
<summary>点击展开/折叠代码</summary>

```json
[
  {
    "type": "entity",
    "name": "Student",
    "fields": [
      {
        "name": "id",
        "type": "id",
        "modelName": "Student",
        "unique": false,
        "nullable": true,
        "generatedValue": "BIGINT_NOT_GENERATED"
      },
      {
        "name": "studentName",
        "type": "string",
        "modelName": "Student",
        "unique": false,
        "nullable": true,
        "length": 255
      },
      {
        "name": "gender",
        "type": "enum",
        "from": "UserGender",
        "multiple": false,
        "modelName": "Student",
        "unique": false,
        "nullable": true
      },
      {
        "name": "interest",
        "type": "enum",
        "from": "user_interest",
        "multiple": true,
        "modelName": "Student",
        "unique": false,
        "nullable": true
      },
      {
        "name": "age",
        "type": "int",
        "modelName": "Student",
        "unique": false,
        "nullable": true
      },
      {
        "name": "classId",
        "type": "bigint",
        "modelName": "Student",
        "unique": false,
        "nullable": true
      },
      {
        "name": "studentDetail",
        "type": "relation",
        "modelName": "Student",
        "unique": false,
        "nullable": true,
        "multiple": false,
        "from": "StudentDetail",
        "localField": "id",
        "foreignField": "studentId",
        "cascadeDelete": true
      }
    ],
    "indexes": [
      {
        "modelName": "Student",
        "name": "IDX_studentName",
        "fields": [
          {
            "fieldName": "studentName",
            "direction": "ASC"
          }
        ],
        "unique": false
      }
    ]
  },
  {
    "type": "entity",
    "name": "StudentDetail",
    "fields": [
      {
        "name": "id",
        "type": "id",
        "modelName": "StudentDetail",
        "unique": false,
        "nullable": true,
        "generatedValue": "AUTO_INCREMENT"
      },
      {
        "name": "studentId",
        "type": "bigint",
        "modelName": "StudentDetail",
        "unique": false,
        "nullable": true
      },
      {
        "type": "relation",
        "name": "student",
        "comment": "班级",
        "modelName": "StudentDetail",
        "multiple": false,
        "from": "Student",
        "localField": "studentId",
        "foreignField": "id",
        "cascadeDelete": false
      },
      {
        "name": "description",
        "type": "text",
        "modelName": "StudentDetail",
        "unique": false,
        "nullable": true
      }
    ]
  },
  {
    "name": "UserGender",
    "type": "enum",
    "elements": [
      "UNKNOWN",
      "MALE",
      "FEMALE"
    ],
    "comment": "性别"
  },
  {
    "name": "user_interest",
    "type": "enum",
    "elements": [
      "chang",
      "tiao",
      "rap",
      "daLanQiu"
    ],
    "comment": "兴趣"
  }
]
```

</details>

此段代码会生成模型如下：

Student:

| 名称            | 类型              |  
|---------------|-----------------|
| studentDetail | StudentDetail   |  
| age           | Int             |  
| id            | ID              |  
| interest      | user_interest[] |  
| classId       | BigInt          |  
| studentName   | String          |  
| gender        | UserGender      |  

StudentDetail:

| 名称          | 类型          |  
|-------------|-------------|
| id          | ID          |
| studentId   | BigInt      |
| student     | Student     |
| description | description |

### 枚举描述

可支持建模选择枚举类型，可作为实体的枚举字段使用

| 属性       | 类型    | 可选属性 | 描述                            |
|----------|-------|------|-------------------------------|
| elements | Array | 否    | 枚举元素，字符串数组，只支持英文或者英文、数字、下划线组合 |

**配置示例：**

新增用户性别枚举，通过additionalProperties支持多语言

<details>  
<summary>点击展开/折叠代码</summary>

```json
{
  "name": "UserGender",
  "type": "enum",
  "elements": [
    "UNKNOWN",
    "MALE",
    "FEMALE"
  ],
  "additionalProperties": {
    "lang": {
      "zh_CN": {
        "UNKNOWN": "未知",
        "MALE": "男",
        "FEMALE": "女"
      },
      "en_US": {
        "UNKNOWN": "Unknown",
        "MALE": "Male",
        "FEMALE": "Female"
      }
    }
  }
}
```

</details>

### 本地查询描述

用于支持建模没办法实现的复杂查询，比较灵活，缺点是跨数据库移植性较差。

| 属性        | 类型     | 可选属性 | 描述 |
|-----------|--------|------|----|
| statement | String | 否    | 语句 |

**配置示例：**

查询用户根据性别分组查询

<details>  
<summary>点击展开/折叠代码</summary>

```json
{
  "name": "分组查询",
  "type": "native_query",
  "statement": "select count(id) as total, gender, max(age) as ageSum from Student group by gender"
}
```

</details>
