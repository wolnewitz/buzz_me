(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController(ListFactory, $http, authService, jwtHelper, store, lock, $locale) {
    var vm = this;
    vm.task = '';
    vm.date = '';
    vm.time = '';
    vm.interval = 0;
    vm.id;

    lock.getProfile(store.get('jwt'), function (error, profile) {
      vm.payload = profile;
      ListFactory.findOrCreateUser(profile.name, profile.email)
        .then(user => {
          ListFactory.getUserTasks(user.data[0].email)
            .then(tasks=>{
              vm.tasks = tasks
            })
            .catch(e=>console.log('error', e))
        });
    });

    vm.authService = authService;

    vm.submit = function(text, email) {
      ListFactory.createTask(text, email)
        .then(task => {
          vm.task = '';
          ListFactory.getUserTasks(email)
            .then(tasks=>vm.tasks = tasks)
        })
    }

    vm.intervalOutput = function(num) {
      if(num === 0) { return "Just Once"; }
      if(num === 1) { return "Every Minute!"; }
      if(num === 60) { return "Every Hour"; }
      if(num === 120) { return "Every 2 Hours"; }
      return `Every ${num} minutes`;
    }

    vm.onTextSubmit = function() {
      var data = {};
      // get date, time, interval from models
      console.log('date', vm.date, 'time', vm.time, 'interval', vm.interval)
      // convert date and time to utc
      // make http request with vm.id
    }

    vm.setTaskId = function(id) {
      vm.id = id;
    }
  }
}());
