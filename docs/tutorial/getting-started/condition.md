---
sidebar_position: 20
---

# 查询条件

## 查询示例

**单个条件**

```json
{
  "username": {
    "_eq": "john_doe"
  }
}
```

**多个条件**

```json
{
  "_and": [
    {
      "username": {
        "_eq": "john_doe"
      }
    },
    {
      "age": {
        "_lt": 65
      }
    },
    {
      "lastLogin": {
        "_lte": "2023-01-01 12:00:11"
      }
    },
    {
      "createdAt": {
        "_between": [
          "2023-01-01 12:00:11",
          "2023-01-01 12:00:11"
        ]
      }
    }
  ]
}

```

**多层级嵌条条件**

```json
{
  "_and": [
    {
      "_and": [
        {
          "username": {
            "_eq": "john_doe"
          }
        }
      ]
    },
    {
      "_or": [
        {
          "remark": {
            "_eq": "aa"
          }
        },
        {
          "locked": {
            "_eq": false
          }
        },
        {
          "email": {
            "_ne": "jane_doe@example.com"
          }
        },
        {
          "age": {
            "_gt": 18
          }
        }
      ]
    },
    {
      "_and": [
        {
          "registrationDate": {
            "_gte": "2020-01-01"
          }
        },
        {
          "age": {
            "_lt": 65
          }
        },
        {
          "lastLogin": {
            "_lte": "2023-01-01"
          }
        },
        {
          "createdAt": {
            "_between": [
              "2022-01-01",
              "2022-12-31"
            ]
          }
        }
      ]
    },
    {
      "_or": [
        {
          "role": {
            "_nin": [
              "banned"
            ]
          }
        },
        {
          "status": {
            "_in": [
              "active",
              "pending"
            ]
          }
        }
      ]
    }
  ]
}
```

## 操作符说明

> 注意事项：只支持同类型的相互比较，relation暂不支持任何运算

| 操作符           | 说明      | 类型支持                                                          |
|---------------|---------|---------------------------------------------------------------|
| _and          | 与       | n/a                                                           |
| _or           | 或       | n/a                                                           |
| _eq           | 等于      | id、string、json、text、int、bigint、decimal、date、datetime 、boolean |
| _ne           | 不等于     | id、string、json、text、int、bigint、decimal、date、datetime 、boolean |
| _gt           | 大于      | int、bigint、decimal、date、datetime                              |
| _gte          | 大于等于    | int、bigint、decimal  、date、datetime                            |
| _lt           | 小于      | int、bigint、decimal 、date、datetime                             |
| _lte          | 小于等于    | int、bigint、decimal 、date、datetime                             |
| _contains     | 包含（模糊匹配）   | string、json、text                                              |
| _not_contains | 不包含（模糊匹配） | string、json、text                                              |
| _starts_with  | 开始于     | id、string、json、text                                           |
| _end_with     | 结束于     | id、string、json、text                                           |
| _in           | 包含      | id、string、json、text、int、bigint、decimal、date、datetime          |
| _nin          | 不包含     | id、string、json、text、int、bigint、decimal、date、datetime          |
| _between       | 范围      | date、datetime                                                 |

