angular.module('makeitso.home', [])

	.controller('homeController', function($scope, $http){
		
		$scope.data = [];

		$scope.getBounties = function(){
			console.log("getBounties() called!!!!")

			$http({
     			'method': 'GET',
     			'url': '/projects',
     			'Content-Type': 'application/json'
   			})
			.success(function(response){
				
				$scope.data = response;
				console.log("Success loading bounties!!!! scope.data: ", $scope.data);


			}).error(function(error){
				console.log(error);

			})		
		}	

		$scope.values = {};
		$scope.contribute = function(username, amount, id){
			$scope.values.username = username;
			$scope.values.amount = amount;
			$scope.values.project_id = id;
 			var stringifiedScope = JSON.stringify($scope.values);
			console.log(stringifiedScope);
			$http({
				'method': 'POST',
     			'url': '/pledges',
     			'Content-Type': 'application/json',
     			'data': stringifiedScope
   			})
			.then(function(){
				console.log('post to pledges went through, all vals:', stringifiedScope);
				$scope.getBounties();
			})
			.catch(function(error){
				console.log('error submitting post to pledges', error)
			});
		}

		$scope.remove = {};
		$scope.claim = function(projectId){
			$scope.remove.projectId = projectId;
			var sendable = JSON.stringify($scope.remove);
			console.log('this is sendable:', sendable);
			$http({
				method: 'DELETE',
				url: "/project/" + projectId,
				headers: {'Content-Type': 'application/json,charset=utf-8'},
				params: sendable
			})
			.then(function(response){
				console.log('project is deleted!',response);
				$scope.getBounties();
			})
			.catch(function(error){
				console.log('there was an error!',error);
			})
		}
	})