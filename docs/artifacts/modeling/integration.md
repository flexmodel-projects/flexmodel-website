---
sidebar_position: 10
---

# 开发集成

为了确保最佳的兼容性和利用最新的Java平台特性，要求最低Java版本为Java 21，低于Java 21的版本不被支持

*引入maven依赖*

基本依赖

```xml
<dependencies>
  <groupId>tech.wetech.flexmodel</groupId>
  <artifactId>flexmodel-core</artifactId>
  <version>0.0.1-SNAPSHOT</version>
</dependencies>
```

FlexModel本身不提供数据库的驱动连接的支持，所以还需要引入数据库厂商依赖，以MySQL为例

```xml
<!-- 数据库驱动 -->
<dependencies>
  <dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.3.0</version>
    <scope>test</scope>
  </dependency>
<!-- 任意数据库连接池 -->  
  <dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.1.0</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```

*然后配置完就能使用了*

```java
public class Simple {
  public static void main(String[] args) {
    // 新建连接池
    HikariDataSource dataSource = new HikariDataSource();
    dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test_db");
    dataSource.setUsername("root");
    dataSource.setPassword("123456");
    // 通过数据源名称获取对应的数据源
    String dsName = "mysql";

    // 设置默认数据源
    JdbcDataSourceProvider jdbcDataSourceProvider = new JdbcDataSourceProvider(dataSource);
    SessionFactory sessionFactory = SessionFactory.builder()
      .setDefaultDataSourceProvider(jdbcDataSourceProvider)
      .build();
    // 创建会话，开始使用
    Session session = sessionFactory.createSession(dsName);
  }
}
```

