# 增删改查

## 查询

查询示例

```java
List<Map<String, Object>> groupList = session.find(entityName, query -> query
  // 设置查询字段，不设置则查询模型（实体/视图）的所有字段
  .setProjection(projection -> projection
    .addField("teacher_name", field("name"))
    // 支持的函数见 tech.wetech.flexmodel.Projections 类
    .addField("course_count", count(field(courseEntityName + ".teacher_id")))
    .addField("course_score_sum", sum(field(courseEntityName + ".c_score")))
  )
  // 设置关联表
  .setJoins(joiners -> joiners
    .addInnerJoin(joiner -> joiner
      .setFrom(courseEntityName)
      .setLocalField("id") // 主键字段，存在关联关系时可不指定
      .setForeignField("teacher_id") // 外键字段，存在关联关系时可不指定
      .setFilter(f -> f.notEqualTo("teacher_id", 999))
    )
  )
  // 设置分组
  .setGroupBy(groupBy -> groupBy
    .addField("teacher_name")
  )
  // 设置过滤条件
  .setFilter(f -> f.equalTo("username", "john_doe")
    .or()
    .equalTo("remark", "aa")
    .equalTo("locked", false)
    .notEqualTo("email", "jane_doe@example.com")
    .greaterThan("age", 18)
    .and()
    .greaterThanOrEqualTo("registrationDate", "2020-01-01")
    .lessThan("age", 65)
    .lessThanOrEqualTo("lastLogin", "2023-01-01")
    .or(or -> or.notIn("role", List.of("banned")).in("status", List.of("active", "pending")))
    .between("createdAt", "2022-01-01", "2022-12-31"))
  // 设置排序
  .setSort(sort -> sort.addOrder("id", Direction.DESC))
  // 设置分页查询
  .setPage(1, 100)
);

```

日期时间格式化

```java
// 支持yyyy-MM-dd hh:mm:ss格式的日期时间格式化
List<Map<String, Object>> dateFormatList = session.find(entityName, query -> query
  .setProjection(projection -> projection
    .addField("datetime", dateFormat(field("birthday"), "yyyy/MM/dd hh:mm:ss"))
    .addField("user_count", count(field("id"))))
  .setGroupBy(groupBy ->
    groupBy.addField("datetime") // 根据别名进行分组
  )
);
```

按照一年中的天数分组

```java
List<Map<String, Object>> dayOfYearList = session.find(entityName, query -> query
  .setProjection(projection -> projection
    .addField("dayOfYear", dayOfYear(field("birthday")))
    .addField("user_count", count(field("id"))))
  .setGroupBy(groupBy ->
    groupBy.addField("dayOfYear")
  )
);
```

按照一月中的天数进行分组

```java
Assertions.assertFalse(dayOfYearList.isEmpty());
List<Map<String, Object>> dayOfMonthList = session.find(entityName, query -> query
  .setProjection(projection -> projection
    .addField("dayOfMonth", dayOfMonth(field("birthday")))
    .addField("user_count", count(field("id"))))
  .setGroupBy(groupBy ->
    groupBy.addField("dayOfMonth")
  )
);

```

按照一周中的天数进行分组

```java
List<Map<String, Object>> dayOfWeekList = session.find(entityName, query -> query
  .setProjection(projection -> projection
    .addField("dayOfWeek", dayOfWeek(field("birthday")))
    .addField("user_count", count(field("id"))))
  .setGroupBy(groupBy ->
    groupBy.addField("dayOfWeek")
  )
);
```

查询返回实体类

```java
List<TeacherDTO> list = session.find(entityName, query -> query, TeacherDTO.class);
```


## 新增

新增一条数据

```java
Map<String, Object> record = new HashMap<>();
record.put("name", "张三丰");
record.put("age", 218);
record.put("description", "武当山道士");
record.put("createDatetime", LocalDateTime.now());
record.put("birthday", LocalDate.of(1247, 1, 1));
record.put("isLocked", true);
Assertions.assertEquals(1, session.insert(entityName, record));
```

新增多条数据

```java
String data = """
      [
        { "teacher_id": 1, "c_name": "语文", "c_score": 92 },
        { "teacher_id": 2, "c_name": "数学", "c_score": 78 },
        { "teacher_id": 3, "c_name": "英语", "c_score": 85 }
      ]
      """;
    List<Map<String, Object>> records = JsonUtils.getInstance().parseToObject(data, List.class);
    session.insertAll(entityName, records);
```

## 更新

根据ID更新

```java
Map<String, Object> record = new HashMap<>();
record.put("name", "李白");
record.put("age", 61);
record.put("description", "字太白，号青莲居士");
Long id = 999;
int affectedRows = session.updateById(entityName, record2, id);
```

## 删除

根据ID删除

```java
session.deleteById(entityName, 1);
```
