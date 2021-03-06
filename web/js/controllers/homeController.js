
angular.module('aloha').controller('homeController', function ($scope, $log, HomeService,$location,$window,$rootScope) {


  console.log($window);

  $scope.service = HomeService;
  $scope.objUser = {
    
    name:'Aloha user',
    surname:'',
    password: 'aloha',
    email: 'aloha@aloha.com',
    hostelero: false,
    companyName: '',
    nif: ''
    
  }
   
  $scope.objSearch = {
    
    zone:'',
    rooms: 'Habitación',
    dateini: 0,
    dateend: 0

  }
  $scope.rooms = ['Habitaciones',1,2,3,4,5];
  $scope.zones = ["Zona","Centro","Albaicin","Chana","Estación de autobuses"];
  $scope.objSearch.zone = $scope.zones[0];
  $scope.objSearch.rooms = $scope.rooms[0];
  $scope.confirmPass = '';
  /**
   * Funcion que registra al usuario
   */
   $scope.register = function(){
     
   
     if( !$scope.objUser.hostelero && $scope.objUser.name != '' && $scope.objUser.surname != '' 
        && $scope.objUser.password != '' && $scope.objUser.email != ''
        && $scope.objUser.email != '' && $scope.confirmPass != '' && ($scope.objUser.password == $scope.confirmPass)){
      
       $scope.serviceAction('registerUser',$scope.objUser);
       
       
     }else if($scope.objUser.hostelero && $scope.objUser.companyName != '' && $scope.objUser.nif != ''){
         
         $scope.serviceAction('logIn',$scope.objUser);
               
    }
    /**
     * Funcion que inicia la sesión del usuario
     */ 
      $scope.signup = function(){
        
        if($scope.objUser !='' && $scope.objUser.password){
           $scope.serviceAction('login',$scope.objUser);
        }
        
      }
    
  
   }
  
  /**
   * Lanza mensje de alerta al usuario a la hora de subscribirse
   */
   $scope.subscribe = function(){
      alertify.success('¡Gracias por subscribise!');
   }
  
  /**
   * Función que controla si un usuario es hostelero o no a la hora de registrarse
   */
  $scope.hostelero = false;
  $scope.hosteleroToggle = function() {
     $scope.hostelero = !$scope.hostelero;
  }
  
  /**
   * Función y variables que controlan las fechas de busqueda de un alojamiento
   */
  
  $scope.today = function() {
    $scope.dt = new Date();
  };
  
  $scope.asistente = function() {
    
    $window.location.href = "https://localhost/DGP-Improved-Deals/web/explore.html";
    
  };
  
  $scope.today();
  $scope.dtstart = null;
  $scope.dtend = null;

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  /*$scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };*/

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event,obj) {
    $event.preventDefault();
    $event.stopPropagation();

    if(obj == 'dp1'){
    	$scope.openeddt1 = true;
    }else if(obj == 'dp2'){
    	$scope.openeddt2 = true;
    }

  /**
   * Funcion que realiza la acción de buscar
   */
  $scope.search = function(){
    
    if($scope.dtstart != null && $scope.dtend != null){
        	
          $window.prueba = true;
          
          
          $scope.objSearch.dateini = $scope.dtstart;
          $scope.objSearch.dateend = $scope.dtend;

          $rootScope.$emit('hometoexplore', $scope.objSearch);
                
          $window.location.href = 'http://localhost/DGP-Improved-Deals/web/explore.html';
          
         
         
    }

  };

  $scope.serviceAction = function(action,obj){
    
      switch (action) {
        case 'registeruser':
          
          $scope.service.post('registerUser', {
            
              action:'registeruser',
              name: obj.name,
              surname: obj.surname,
              email: obj.email,
              password: obj.password,
              hostelero: obj.hostelero,
              
            }).then(function(response){
        
              var response = angular.fromJson(response.data);
              console.log(response);
          });
         break;
      
        case 'logIn':
            
            $scope.service.post('login', {
              
                action:'login',
                email: obj.email,
                password: obj.password,
                
              }).then(function(response){
          
                var response = angular.fromJson(response.data);
               
                if(response.status == 0){
                    $window.location.href = "http://localhost/DGP-Improved-Deals/web/explore.html";
                }
            });
           break;
           
         case 'searchHome':
            
            $scope.service.post('searchHome', {
              
                action:'search',
                zone: obj.zone,
                rooms: obj.room,
                dateini: obj.dateini,
                dateend: obj.dateend
                
              }).then(function(response){
          
                var response = angular.fromJson(response.data);
               
                
               
            });
           break;
           
        default:
          break;
       }
    
    
      };
    
    };


});