---
sidebar_position: 30
---

# flexmodel-graphql

Flexmodel的graphql模块，将建模转换为GraphQL查询

引入maven依赖

```xml

<dependency>
    <groupId>tech.wetech.flexmodel</groupId>
    <artifactId>flexmodel-graphql</artifactId>
    <version>LATEST</version>
</dependency>
```

开始使用

```java
// sessionFactory配置此处省略
GraphQLProvider graphQLProvider = new GraphQLProvider(sessionFactory);
graphQLProvider.init();
GraphQL graphQL = graphQLProvider.getGraphQL();
String operationName = "MyQuery";
String query = """
    query MyQuery($order_by: system_Classes_order_by = { id: asc }, $size: Int = 10, $page: Int = 1) {
        system_list_Classes(order_by: $order_by, size: $size, page: $page) {
          classCode
          className
          id
        }
    }
    """;
Map<String, Object> variables = new HashMap<>();
variables.put("order_by", Map.of("id", "desc"));
ExecutionInput executionInput = newExecutionInput()
    .operationName(operationName)
    .query(query)
    .variables(variables)
    .build();
ExecutionResult result = graphQL.execute(executionInput);
// 执行结果
List<?> list = result.getData()
```

关于SessionFactory的配置，见[flexmodel-core模块](flexmodel-core.md);
