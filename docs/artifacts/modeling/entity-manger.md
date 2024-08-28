# 实体管理

创建实体

```java
session.createEntity("teacher", entity -> entity
  // 主键，当主键为整形字段时支持设置自增，也可以使用字符串配合值计算器生成
  .addField(new IDField("id").setComment("Primary Key"))
  // 姓名
  .addField(new StringField("name").setComment("姓名").setNullable(false).setLength(10))
  // 年龄，支持设置验证器进行业务验证
  .addField(new IntField("age").setComment("年龄").addValidator(new NumberRangeValidator<>(1, 300)))
  // 备注
  .addField(new TextField("description").setComment("备注"))
  // 生日
  .addField(new DateField("birthday").setComment("生日"))
  // 是否禁用
  .addField(new BooleanField("isLocked").setNullable(false).setDefaultValue(false).setComment("是否禁用"))
  // 创建时间，设置默认值等于当前时间
  .addField(new DatetimeField("createDatetime").setComment("创建日期时间").addCalculation(new DatetimeNowValueCalculator()))
  // 扩展信息
  .addField(new JsonField("extra").setComment("扩展信息"))
  // 创建索引
  .addIndex(index -> index.addField("name", Direction.DESC).addField("id"))
  .setComment("教师表")
);

```

创建字段

字段即实体的属性

```java
// 创建实体时至少要有一个ID字段
session.createEntity("teacher_course", sScore -> sScore
  .addField(new IDField<>("id").setGeneratedValue(DefaultGeneratedValue.AUTO_INCREMENT).setComment("Primary Key"))
  .setComment("教师成绩表")
);
// 创建字段
session.createField(entityName, new StringField("c_name"));
session.createField(entityName, new DecimalField("c_score"));

```

新增关联关系字段
```java
// 此功能会建立外键约束
session.createField("teacher", new RelationField("teacher_course")
  .setCardinality(ONE_TO_MANY) // 关联方式，如果是ONE_TO_ONE时，外键字段的会存在唯一索引约束，当关联关系是MANY_TO_MANY时，会建立中间表保存多对多的关联关系
  .setCascadeDelete(true) // 级联删除，依赖于外键字段 on delete cascade
  .setTargetEntity("teacher_course") // 目标实体
  .setTargetField("teacher_id")  // 目标字段
);
```

删除字段

```java
session.dropField("teacher_course", "name");
```

删除实体

```java
session.dropModel(entityName);
```

创建索引

```java
// 单个字段索引
Index index = new Index("teacher", "IDX_name");
index.addField("name");
// 是否唯一
index.setUnique(true);
// 索引验证提示
index.setValidMessage("名称字段必须唯一");
session.createIndex(index);
// 组合索引
// when include multiple field
Index multipleFiledIndex = new Index("teacher");
multipleFiledIndex.addField("birthday");
multipleFiledIndex.addField("age", DESC);
multipleFiledIndex.addField("is_deleted", DESC);
multipleFiledIndex.setName("IDX_compound");
session.createIndex(multipleFiledIndex);
```

删除索引

```java
session.dropIndex(modelName, indexName);
```
