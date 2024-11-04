---
sidebar_position: 1
---

# 动态ORM

作为Flexmodel的核心建模引擎，不仅集成了强大的建模功能，还能够独立运作为一款高效的ORM框架，它特别支持国产化数据库的深度适配，无需更改任何代码，为开发者提供了更加灵活与广泛的数据库操作解决方案。

## 功能一览

* 提供开发者友好的API，统一封装，屏蔽数据库差异，一招吃遍天下
* 支持数据库表、视图、字段、序列、索引的动态创建和删除，保证足够灵活
* 支持多达十几种数据库的适配，且已经拥有大量集成测试用例覆盖，以确保适用性和可靠性
* 支持自定义业务字段类型、数据验证器、值计算逻辑、建模的持久化方式

## 数据库支持

以下为已经适配并且通过大量集成测试用例覆盖过的数据库

**关系型数据库**

| 数据库名称      | 兼容版本/已验证版本    | 连接参数                   |
|------------|---------------|------------------------|
| MySQL      | 8.0           |                        |
| MariaDB    | 10.3.6        |                        |
| Oracle     | 21c           |                        |
| SQL Server | 2017-CU12     |                        |
| PostgreSQL | 16-3.4-alpine |                        |
| DB2        | 11.5.0.0a     | progressiveStreaming=2 |
| SQLite     | 3.45.3        |                        |
| Informix   | 14.10         |                        |
| GBase      | 8s            | DELIMIDENT=y;          |
| 达梦         | DM8           |                        |
| TiDB       | v7.1.5        |                        |

**文档型数据库**

| 数据库名称   | 兼容版本 | 连接参数 |
|---------|------|------|
| MongoDB | 5.0  |      |


## 基本概念

关于建模引擎你需要知道的一些事

### 实体（Entity）

实体（Entity）是指现实中有形的事物，在关系型数据库中对应数据表（Table），在MongoDB中对应集合（Collection）

### 字段（Field）

字段即实体的属性，目前已经内置一些常用的字段类型，开发者也可根据业务情况进行扩展

#### 内置的字段类型

| 类型       | 名称   | Java类型映射                |
|----------|------|-------------------------|
| string   | 字符串  | java.lang.String        |
| text     | 文本   | java.lang.String        |
| int      | 整型   | java.lang.Integer       |
| bigint   | 长整型  | java.lang.Long          |
| decimal  | 小数   | java.lang.Double        |
| boolean  | 布尔   | java.lang.Boolean       |
| datetime | 日期时间 | java.time.LocalDateTime |
| date     | 日期   | java.time.LocalDate     |
| json     | JSON | N/A                     |
| id       | ID   | N/A                     |
| relation | 关系   | N/A                     |

### 视图（View）

视图是一个虚拟的表，其内容由查询定义，视图本身不支持存储数据，而是保存了查询语句。

### 索引（Index）

索引相当于一本书的目录，用于提高查询效率。

### 序列（Sequence）

序列是指按照一定规律增加的数字，一般作为唯一标识符使用，可以与年月日或特定字符组合使用。

### 验证器（Validator）

验证器是对用户提交的数据进行合法性验证，开发者可自定义验证器来支持业务功能。

### 值生成器（ValueGenerator）

值生成器可用于默认值计算，开发者可自定义值生成器来支持业务功能。

## 章节目录

这个章节是文档侧边栏功能的一个总览。 在接下来的章节中，我们会系统地介绍下列概念：

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```


