
# 视图管理

创建视图

```java
session.createView("teacher_course_report", "teacher", query -> query
      .setProjection(projection -> projection
          .addField("teacher_id", field("id"))
          .addField("teacher_name", field("name"))
          .addField("age_max", max(field("age")))
          .addField("age_count", count(field("age")))
      )
      .setJoins(joiners -> joiners
        .addLeftJoin(joiner -> joiner
          .setLocalField("id") // 主键字段，存在关联关系时可不指定
          .setForeignField("teacher_id") // 外键字段，存在关联关系时可不指定
          .setFrom(teacherCourseEntityName)
        )
      )
      .setFilter(f -> f.greaterThanOrEqualTo("id", 1))
      .setGroupBy(groupBy -> groupBy
        .addField("id")
        .addField("teacher_name")
      )
      .setSort(sort -> sort.addOrder("id", Direction.DESC))
      .setLimit(100)
      .setOffset(0)
  );

```

查询视图数据

```java
List<Map<String, Object>> list = session.find("teacher_course_report", query -> query
  .setFilter(f -> f.equalTo("teacher_id", 2))
);
```

删除视图

```java
session.dropModel("teacher_course_report"); // 同删除实体
```
