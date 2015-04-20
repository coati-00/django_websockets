var TodoControllers = angular.module('TodoControllers', []);
console.log("After initial TodoControllers");
TodoControllers.controller('TodoListCtrl', ['$scope', '$dragon', function ($scope, $dragon) {
    $scope.todoList = {};
    $scope.todoItems = [];
    $scope.channel = 'todos';

    $dragon.onReady(function() {
    	console.log("onReady executes only once, when the connection is ready"); 
        $dragon.subscribe('todo-item', $scope.channel, {todo_list__id: 1}).then(function(response) {
            $scope.dataMapper = new DataMapper(response.data);
        });

        $dragon.getSingle('todo-list', {id:1}).then(function(response) {
        	console.log(response.data);
            $scope.todoList = response.data;
        });

        $dragon.getList('todo-item', {list_id:1}).then(function(response) {
        	console.log(response.data);
            $scope.todoItems = response.data;
        });
    });

    $dragon.onChannelMessage(function(channels, message) {
    	console.log("onChannelMessage triggered every time some data is published.");
    	console.log(channels); 
    	console.log(message); 
        if (indexOf.call(channels, $scope.channel) > -1) {
            $scope.$apply(function() {
                $scope.dataMapper.mapData($scope.todoItems, message);
            });
        }
    });

    $scope.itemDone = function(item) {
    	console.log("Inside dragon.onReady");
        item.done = true != item.done;
        $dragon.update('todo-item', item);
    }
}]);
console.log(TodoControllers.controller());
console.log(TodoControllers.controller().TodoListCtrl);
console.log(TodoControllers.controller());
console.log("End JS");

swampdragon.callRouter('todo-item', {'done': true}, function (context, data) {
    console.log(data.result);
});

swampdragon.getSingle('todo-list', {id:'1'}, function (context, data) {
	console.log(data);
}, function (context, data) {console.log(data);
});

var data = {some_value: 12, other_value: 'hello world', id: 123};
swampdragon.update('todo-list', data, function (context, data) { console.log(data); }, function (context, data) { console.log(data); } );