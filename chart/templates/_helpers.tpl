{{- define "labels" }}
app: {{ .Release.Name }}-app
{{- end }}

{{- define "name.configMap" -}}
{{ .Release.Name }}-config-map
{{- end -}}

{{- define "name.serviceAccount" -}}
{{ .Release.Name }}-service-account
{{- end -}}

{{- define "name.role" -}}
{{ .Release.Name }}-role
{{- end -}}
