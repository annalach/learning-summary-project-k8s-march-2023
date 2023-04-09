{{- define "names.name" -}}
{{ .Values.nameOverride | default .Chart.Name }}
{{- end -}}

{{- define "names.configMap" -}}
{{ .Release.Name }}-config-map
{{- end -}}

{{- define "names.serviceAccount" -}}
{{ .Release.Name }}-service-account
{{- end -}}

{{- define "names.role" -}}
{{ .Release.Name }}-role
{{- end -}}
