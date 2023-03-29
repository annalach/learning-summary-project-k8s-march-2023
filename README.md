# learning-summary-project-k8s-march-2023

- Node Version Manager 0.39.3
- Node.js 19.8.1
- npm 9.5.1

- Docker 20.10.23
- Minikube 1.29.0
- Kubernetes 1.26.1
- Helm 3.11.2


```
docker build -t myapp:v0.1.0 -f app/Dockerfile app
```

```
docker run -p 8000:8000 -e PORT=8000 myapp:v0.1.0
```

```
minikube image load myapp:v0.1.0
```

```
helm install myapp-release chart
```
