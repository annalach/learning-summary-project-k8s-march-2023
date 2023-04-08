import Head from "next/head";
import { Inter } from "next/font/google";
import { KubeConfig, CoreV1Api, V1PodStatus } from "@kubernetes/client-node";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

type Pod = {
  name: string;
  ready: string;
  status: string;
  age: string;
};

type Props = {
  namespace: string;
  pods: Pod[];
};

export default function Home(props: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>k8s app</title>
        <meta
          name="description"
          content="Learning summary project k8s March 2023"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Learning summary project&nbsp;
            <code className={styles.code}>k8s</code>&nbsp;March 2023
          </p>
          <div>
            <a
              href="https://github.com/annalach/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By Anna Łach
            </a>
          </div>
        </div>
        <div className={styles.info}>
          <h1>Pods running in the {props.namespace} namespace</h1>
        </div>
        <div className={styles.center}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ready</th>
                <th>Status</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {props.pods.map(({ name, status, ready, age }) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{ready}</td>
                  <td>{status}</td>
                  <td>{age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.grid}>
          <a
            href="https://kubernetes.io/docs/home/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Kubernetes Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Kubernetes.
            </p>
          </a>

          <a
            href="https://helm.sh/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Helm Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Helm.
            </p>
          </a>

          <a
            href="https://www.udemy.com/course/certified-kubernetes-application-developer/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              CKAD Course <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn Kubernetes for Applications Developers.
            </p>
          </a>

          <a
            href="https://www.youtube.com/playlist?list=PLSwo-wAGP1b8svO5fbAr7ko2Buz6GuH1g"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Helm Course <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Learn Helm.</p>
          </a>
        </div>
      </main>
    </>
  );
}

type ServerSideProps = {
  props: Props;
};

export async function getServerSideProps(): Promise<ServerSideProps> {
  const kc = new KubeConfig();
  kc.loadFromDefault();

  const k8sApi = kc.makeApiClient(CoreV1Api);

  const namespace = process.env.NAMESPACE!;
  const response = await k8sApi.listNamespacedPod(namespace);
  const pods = response.body.items.map(({ metadata, status: podStatus }) => {
    const ready = getReady(podStatus);
    const status = getStatus(podStatus);
    const age = getAge(Date.now(), podStatus?.startTime);

    return {
      name: metadata?.name!,
      ready,
      status,
      age,
    };
  });

  return {
    props: {
      namespace,
      pods,
    },
  };
}

function getReady(podStatus?: V1PodStatus): string {
  if (!podStatus || !podStatus.containerStatuses) {
    return "";
  }

  return `${podStatus?.containerStatuses?.reduce(
    (previousValue, currentValue) => {
      if (currentValue.ready) {
        return previousValue + 1;
      }
      return previousValue;
    },
    0
  )}/${podStatus?.containerStatuses?.length}`;
}

function getStatus(podStatus?: V1PodStatus): string {
  if (!podStatus) {
    return "";
  }

  const containerStatusesSummary =
    (podStatus?.containerStatuses?.some(({ state }) => state?.waiting) &&
      podStatus?.containerStatuses?.reduce((previousValue, currentValue) => {
        if (currentValue.state?.waiting) {
          return currentValue.state?.waiting?.reason || previousValue;
        }
        return previousValue;
      }, "")) ||
    podStatus?.phase;

  return containerStatusesSummary || "";
}

function getAge(currentTimeInEpoch: number, startTime?: Date): string {
  if (!startTime) {
    return "";
  }

  const timeDiffInMilliseconds = currentTimeInEpoch - startTime.getTime();
  const timeDiffInSeconds = Math.floor(timeDiffInMilliseconds / 1000);

  const seconds = timeDiffInSeconds % 60;
  const secondsAsString = seconds < 10 ? `0${seconds}` : seconds;

  const timeDiffInMinutes = Math.floor(timeDiffInSeconds / 60);

  const minutes = timeDiffInMinutes % 60;
  const minutesAsString = minutes < 10 ? `0${minutes}` : minutes;

  const hours = Math.floor(timeDiffInMinutes / 60);
  const hoursAsString = hours < 10 ? `0${hours}` : hours;

  if (hoursAsString === "00" && minutesAsString === "00") {
    return `${secondsAsString}s`;
  }

  if (hoursAsString === "00") {
    return `${minutesAsString}m${secondsAsString}s`;
  }

  return `${hoursAsString}h${minutesAsString}m${secondsAsString}s`;
}
