# 自增序列


## 新增序列

```java
String sequenceName = "user_seq";
int initialValue = 1;
int incrementSize = 1;
session.createSequence(seqName, initialValue, incrementSize);
```

## 获取序列下一个值

```java
long sequenceNextVal = session.getSequenceNextVal(sequenceName);
```

## 删除序列

```java
session.dropSequence(sequenceName);
```
