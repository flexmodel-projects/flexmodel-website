import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '无代码生成通用接口',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
        <>
          通过简化的操作方式，允许用户在无需编写代码的情况下，快速创建和管理应用程序接口，从而提升开发效率和降低技术门槛。
        </>
    ),
  },
  {
    title: '跨源数据关联',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
        <>
          借助 GraphQL 的“超图”，可以轻松地将不同来源的数据进行关联，实现数据的多源查询与聚合。
        </>
    ),
  },
  {
    title: '全面支持信创国产化',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
        <>
          支持国产化环境和多数据库适配，除了主流数据库外，目前已支持达梦、GBase、人大金仓、东方通等多款国产信创平台的接入。
        </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
      <div className={clsx('col col--4')}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img"/>
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
  );
}
