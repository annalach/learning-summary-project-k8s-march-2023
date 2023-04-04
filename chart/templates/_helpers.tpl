{{- define "common.names.name" -}}
{{- .Release.Name -}}
{{- end -}}

{{- define "common.names.appName" -}}
{{ (include "common.names.name" . ) }}-app
{{- end -}}

{{- define "common.names.envVars" -}}
{{ (include "common.names.appName" . ) }}-env-vars
{{- end -}}

{{- define "common.names.deployment" -}}
{{ ( include "common.names.name" . ) }}-deployment
{{- end -}}

{{- define "common.names.service" -}}
{{ ( include "common.names.name" . ) }}-service
{{- end -}}