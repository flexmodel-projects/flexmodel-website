# 跨源关联

进行跨源查询，即将前一个查询的返回值作为参数传递给下一个查询。

```graphql
query MyQuery($studentId: Int @internal) {
  courses: system_list_Student(where: {studentName: {_in: ["李四", "王五"]}}) {
    id @export(as: "studentId")
    classId
    studentName
    courses {
      courseName
      courseNo
    }
    _join {
      detail: system_find_one_StudentDetail(where: {studentId: {_eq: $studentId}}) {
        description
      }
    }
  }
}
```

通过 @export 导出参数，在_join中引用，参数名必须与导出的参数名一致。

通过 @internal 指定是一个内部参数，不返回给客户端。
