import clsx from 'clsx';
import Heading from '@theme/Heading';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '无代码生成通用接口',
    Svg: require('@site/static/img/undraw_developer_activity_re_39tg.svg').default,
    description: (
        <>
          通过简化的操作方式，允许用户在无需编写代码的情况下，快速创建和管理应用程序接口，从而提升开发效率和降低技术门槛。
        </>
    ),
  },
  {
    title: '跨源数据关联',
    Svg: require('@site/static/img/undraw_add_information_j2wg.svg').default,
    description: (
        <>
          借助 GraphQL 的数据图，可以轻松地将不同来源的数据进行关联，实现数据的多源查询与聚合。
        </>
    ),
  },
  {
    title: '全面支持信创国产化',
    Svg: require('@site/static/img/undraw_best_place_re_lne9.svg').default,
    description: (
        <>
          支持国产化环境和多数据库适配，除了主流数据库外，目前已支持达梦、GBase、人大金仓、东方通等多款国产信创平台的接入。
        </>
    ),
  },
];

function Feature({title, Svg, description, index}: FeatureItem & {index: number}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
      <div className={clsx('col col--4')}>
        <div className={clsx(styles.featureCard, isVisible && styles.featureCardVisible)}>
          <div className={styles.featureIcon}>
            <Svg className={styles.featureSvg} role="img"/>
            <div className={styles.iconGlow}></div>
          </div>
          <div className={styles.featureContent}>
            <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
            <p className={styles.featureDescription}>{description}</p>
          </div>
        </div>
      </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>核心特性</h2>
            <p className={styles.sectionSubtitle}>
              强大的功能，简单的操作，让API开发变得前所未有的简单
            </p>
          </div>
          <div className="row">
            {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} index={idx} />
            ))}
          </div>
        </div>
      </section>
  );
}
