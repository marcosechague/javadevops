
Feature: Validation api persona

  	Scenario Outline: Validacion StatusCode APIs persona
		Given un cliente rest
		When se invoca a la url "<endpoint>" 
		Then se obtiene el estado http <httpstatus> 
    	
	   Examples:
	    	|	caso 	|		endpoint 																						| httpstatus 	|
	    	| 	1		|	/api/personas/listar																	| 	200			|
	    	|	2		|   /api/personas/find/1	 																| 	200			|

	
	Scenario Outline: Validacion 
		Given un cliente rest
		When se invoca a la url "<endpoint>" 
		Then se valida que el campo "<campo>" sea "<expected>"
    	
	   Examples:
	    	|	caso 	|		endpoint 									| 		campo			|		expected		|
	    	| 	1		|	/api/personas/listar								| 	$[0].nombre			|		william			|
			| 	2		|	/api/personas/find/2								| 	$.nombre			|		pepito			|
	    	