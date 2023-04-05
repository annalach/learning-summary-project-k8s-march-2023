# learning-summary-project-k8s-march-2023

- Node Version Manager 0.39.3
- Node.js 19.8.1
- npm 9.5.1

- Docker 20.10.23
- Minikube 1.29.0
- Kubernetes 1.26.1
- Helm 3.11.2


```
docker build -t myapp:0.1.0 -f app/Dockerfile app
```

```
docker run -p 8000:8000 -e PORT=8000 myapp:0.1.0
```

```
minikube image load myapp:0.1.0
```

```
helm template chart
```

```
helm install my-release chart
```

```
kubectl get svc
```

```
minikube service my-release-service
```

```
helm upgrade my-release chart --set app.readinessProbeFailure=true
```

A change that happens in ConfigMap doesn't trigger a rolling update of a Deployment when a ConfigMap is used as environment variables file https://github.com/kubernetes/kubernetes/issues/22368. Added `checksum/config` to Pod's annotations to automatically roll a deployment.

```
helm install app chart --set minikube=true
```