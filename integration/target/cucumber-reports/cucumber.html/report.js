$(document).ready(function() {var formatter = new CucumberHTML.DOMFormatter($('.cucumber-report'));formatter.uri("src/test/resources/features/integration-test.feature");
formatter.feature({
  "name": "Validation api persona",
  "description": "",
  "keyword": "Feature"
});
formatter.scenarioOutline({
  "name": "Validacion StatusCode APIs persona",
  "description": "",
  "keyword": "Scenario Outline"
});
formatter.step({
  "name": "un cliente rest",
  "keyword": "Given "
});
formatter.step({
  "name": "se invoca a la url \"\u003cendpoint\u003e\"",
  "keyword": "When "
});
formatter.step({
  "name": "se obtiene el estado http \u003chttpstatus\u003e",
  "keyword": "Then "
});
formatter.examples({
  "name": "",
  "description": "",
  "keyword": "Examples",
  "rows": [
    {
      "cells": [
        "caso",
        "endpoint",
        "httpstatus"
      ]
    },
    {
      "cells": [
        "1",
        "/api/personas/listar",
        "200"
      ]
    },
    {
      "cells": [
        "2",
        "/api/personas/find/1",
        "200"
      ]
    }
  ]
});
formatter.scenario({
  "name": "Validacion StatusCode APIs persona",
  "description": "",
  "keyword": "Scenario Outline"
});
formatter.step({
  "name": "un cliente rest",
  "keyword": "Given "
});
formatter.match({
  "location": "IntegrationStepDefinition.un_cliente_rest()"
});
formatter.result({
  "status": "passed"
});
formatter.step({
  "name": "se invoca a la url \"/api/personas/listar\"",
  "keyword": "When "
});
formatter.match({
  "location": "IntegrationStepDefinition.se_invoca_a_la_url(String)"
});
formatter.result({
  "status": "passed"
});
formatter.step({
  "name": "se obtiene el estado http 200",
  "keyword": "Then "
});
formatter.match({
  "location": "IntegrationStepDefinition.se_obtiene_el_estado_http(int)"
});
formatter.result({
  "status": "passed"
});
formatter.scenario({
  "name": "Validacion StatusCode APIs persona",
  "description": "",
  "keyword": "Scenario Outline"
});
formatter.step({
  "name": "un cliente rest",
  "keyword": "Given "
});
formatter.match({
  "location": "IntegrationStepDefinition.un_cliente_rest()"
});
formatter.result({
  "status": "passed"
});
formatter.step({
  "name": "se invoca a la url \"/api/personas/find/1\"",
  "keyword": "When "
});
formatter.match({
  "location": "IntegrationStepDefinition.se_invoca_a_la_url(String)"
});
formatter.result({
  "status": "passed"
});
formatter.step({
  "name": "se obtiene el estado http 200",
  "keyword": "Then "
});
formatter.match({
  "location": "IntegrationStepDefinition.se_obtiene_el_estado_http(int)"
});
formatter.result({
  "status": "passed"
});
formatter.scenarioOutline({
  "name": "Validacion",
  "description": "",
  "keyword": "Scenario Outline"
});
formatter.step({
  "name": "un cliente rest",
  "keyword": "Given "
});
formatter.step({
  "name": "se invoca a la url \"\u003cendpoint\u003e\"",
  "keyword": "When "
});
formatter.step({
  "name": "se valida que el campo \"\u003ccampo\u003e\" sea \"\u003cexpected\u003e\"",
  "keyword": "Then "
});
formatter.examples({
  "name": "",
  "description": "",
  "keyword": "Examples",
  "rows": [
    {
      "cells": [
        "caso",
        "endpoint",
        "campo",
        "expected"
      ]
    },
    {
      "cells": [
        "1",
        "/api/personas/listar",
        "$[0].nombre",
        "william"
      ]
    },
    {
      "cells": [
        "2",
        "/api/personas/find/2",
        "$.nombre",
        "pepito"
      ]
    }
  ]
});
formatter.scenario({
  "name": "Validacion",
  "description": "",
  "keyword": "Scenario Outline"
});
formatter.step({
  "name": "un cliente rest",
  "keyword": "Given "
});
formatter.match({
  "location": "IntegrationStepDefinition.un_cliente_rest()"
});
formatter.result({
  "status": "passed"
});
formatter.step({
  "name": "se invoca a la url \"/api/personas/listar\"",
  "keyword": "When "
});
formatter.match({
  "location": "IntegrationStepDefinition.se_invoca_a_la_url(String)"
});
formatter.result({
  "status": "passed"
});
formatter.step({
  "name": "se valida que el campo \"$[0].nombre\" sea \"william\"",
  "keyword": "Then "
});
formatter.match({
  "location": "IntegrationStepDefinition.se_valida_que_el_campo_sea(String,String)"
});
formatter.result({
  "status": "passed"
});
formatter.scenario({
  "name": "Validacion",
  "description": "",
  "keyword": "Scenario Outline"
});
formatter.step({
  "name": "un cliente rest",
  "keyword": "Given "
});
formatter.match({
  "location": "IntegrationStepDefinition.un_cliente_rest()"
});
formatter.result({
  "status": "passed"
});
formatter.step({
  "name": "se invoca a la url \"/api/personas/find/2\"",
  "keyword": "When "
});
formatter.match({
  "location": "IntegrationStepDefinition.se_invoca_a_la_url(String)"
});
formatter.result({
  "status": "passed"
});
formatter.step({
  "name": "se valida que el campo \"$.nombre\" sea \"pepito\"",
  "keyword": "Then "
});
formatter.match({
  "location": "IntegrationStepDefinition.se_valida_que_el_campo_sea(String,String)"
});
formatter.result({
  "status": "passed"
});
});