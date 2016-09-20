angular.module('app',['dndLists','ui.bootstrap']);

angular.module("app").controller("AdvancedDemoController", function($scope) {

    $scope.dragoverCallback = function(event, index, external, type) {
        $scope.logListEvent('dragged over', event, index, external, type);
        // Disallow dropping in the third row. Could also be done with dnd-disable-if.
        return index < 10;
    };

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
        $scope.logListEvent('dropped at', event, index, external, type);
        if (external) {
            if (allowedType === 'itemType' && !item.label) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }
        return item;
    };
    $scope.hafta = 1;
    $scope.ayrintilar = false;
    $scope.logEvent = function(message, event) {
        console.log(message, '(triggered by the following', event.type, 'event)');
        console.log(event);
    };

    $scope.logListEvent = function(action, event, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element is ' + action + ' position ' + index;
        $scope.logEvent(message, event);
    };

    $scope.model = [];
    $scope.ogrenciler = [];
    var id = 100;

    for (var i=1;i<5;i++)
    {
      $scope.ogrenciler[i-1] = {label:"Ogrenci "+id++,dersler:[]};
    }

    $scope.ogrenciler.forEach(function(ogrenci)
      {
               for (var i = 1;i<7;i++)
          {
              ogrenci.dersler[i-1]=  {ad:ogrenci.label ,label:"Ders "+i,yoklama:"yerleştirilmedi"};
          }
      });



    // Initialize model
    var id = 1;
    for (var i = 1; i < 7; ++i) {
        $scope.model[i-1] = {name:"Saat "+i,ekipler:[],egitmen:"ahmet" };
    }

    $scope.model.forEach(function(model)
        {
          
            for(var i=1; i<2;i++){
              id++;
            model.ekipler[i-1] = {tekne:"delphia",ogrenciler:[],limit:5,durum:"tamamlanmadı",seviye:"1 Yıldız",Bsaat:12+id,esaat:2};
            }
            
                        model.ekipler.forEach(function(ekip){

                            for(var i=1;i<5;i++){
                            ekip.ogrenciler[i-1] = {ad:"Ogrenci "+id++,yoklama:"bekleniyor"};

                        }
                        });
        });




    $scope.$watch('model', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);

    }, true);

    $scope.$watch('ogrenciler', function(ogrenciler) {
        $scope.modelAsJson2 = angular.toJson(ogrenciler, true);
        
    }, true);

});

angular.module("app").controller("DateController",function($scope)
{
     $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
   // dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});
