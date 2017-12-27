/* Copyright (c) Roberto L. Badaró Jr. ("Author")
 * All rights reserved.
 * 
 * The BSD License
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 
 * 1. Redistributions of source code must retain the above copyright
 *	notice, this list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright
 *	notice, this list of conditions and the following disclaimer in the
 *	documentation and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function(easyStepWizardPath) {
	'use strict';
  	angular.module('easy.stepwizard', [])
  	.directive('easyStepWizard', function ($timeout) {
		return {
			restrict: 'E',
			scope: {
				nextIf: '@',
				textNext: '@',
				classNext: '@',
				previousIf: '@',
				textPrevious: '@',
				classPrevious: '@',
				selector: '='
			},
			controller: ['$scope', function EasyStepWizardCtrl($scope) {
				var ctrl = this;
				var steps = $scope.steps = [];
				var curr = { index: 0 };
				var totalSteps = 0;
				var wizardAnimations = function () {
					var header = $('#sw-header-text');
					var progressBar = $('#sw-progress');
					var progressValues = [0,0]; /* 0 - progress per step, 1 - total progress */
					var removeClass = function(el, clazz) {
						setTimeout(function() { el.removeClass(clazz); }, 500);
					};
					var animateHeader = function() {
						header.addClass('in-bottom');
						removeClass(header, 'in-bottom');
					};
					var animateContent = function(_step) {
						var nextStepEl = $('#sw-step-' + _step);
						var clazz = 'in-bottom';
						if (nextStepEl) {
							nextStepEl.addClass(clazz);
							removeClass(nextStepEl, clazz);
						}
					};
					var animateProgress = function(_step) {
						if (_step === 1) {
							progressValues[1] = (progressValues[0] / 2);
						} else if (_step === totalSteps) {
							progressValues[1] = 100;
						} else {
							progressValues[1] = (progressValues[0] * (_step - 1)) + (progressValues[0] / 2);
						}
						progressBar.css({'width': progressValues[1] + '%'});
					};
					var updateSteps = function(_step) {
						if (steps.length > 0) {
							if (curr.index > _step.index) {
								for (var i = curr.index; i > _step.index; i--) { 
									steps[i - 1].enabled = _step.nextIf;
									steps[i - 1].done = false; 
								}
							} else {
								for (var i = 0; i < _step.index; i++) { 
									steps[i].enabled = _step.previousIf;
									steps[i].done = true; 
								}
							}
						}
					};
					return {
						runAnimations: function(_curr, _step) {
							animateHeader();
							animateContent(_step);
							animateProgress(_step);
						},
						updateProgress: function(_step) {
							if (_step.index !== 0) {
								progressValues[0] = Math.round(100 / totalSteps);
								animateProgress(_step.index);
							}
						},
						updateSelectors: function(_step) {
							updateSteps(_step);
						}
					}
				}();
				$scope.stepSelector = $scope.selector || {};
				$scope.stepSelector.select = function(step) {
					if (step.enabled && (!curr || step.index !== curr.index)) {
						wizardAnimations.runAnimations(curr.index, step.index);
						wizardAnimations.updateSelectors(step); /* block/unblock navigation */

						curr.selected = false;
						step.selected = true;
						curr = $scope.currStep = step;
					}
				};
				$scope.stepSelector.previous = function() {
					curr.onPrevious();
					var prev = steps[curr.index - 2];
					prev.enabled = true;
					$scope.stepSelector.select(prev);
				};
				$scope.stepSelector.next = function() {
					curr.onNext();
					var next = steps[curr.index];
					next.enabled = true;
					$scope.stepSelector.select(next);
				};
				ctrl.addStep = function(step) {
					step.index = ++totalSteps;
					step.classPrevious = step.classPrevious || $scope.classPrevious;
					step.classNext = step.classNext || $scope.classNext;
					if (steps.length === 0) {
						step.enabled = true;
						$scope.stepSelector.select(step);
					}
					steps.push(step);
				};
				ctrl.previous = $scope.stepSelector.previous;
				ctrl.next = $scope.stepSelector.next;
				$scope.$watch(function() { return totalSteps }, function() { wizardAnimations.updateProgress(curr); });
			}],
			replace: false,
			transclude: true,
			templateUrl: easyStepWizardPath + 'el/easy-step-wizard.html'
		};
	})
	.directive('easyStep', function () {
		return {
			restrict: 'E',
			require: '^^easyStepWizard',
			replace: false,
			transclude: true,
			scope: { 
				header: '=',
				description: '=',
				onNext: '&',
				nextIf: '=',
				textNext: '@',
				classNext: '@',
				onPrevious: '&',
				previousIf: '=',
				textPrevious: '@',
				classPrevious: '@'
			},
			compile: function(element, attrs) {
				if (!attrs.textNext) { attrs.textNext = 'Next'; }
				if (!attrs.textPrevious) { attrs.textPrevious = 'Back'; }

				return function(scope, element, attrs, wizardCtrl) {
					scope.wizard = wizardCtrl;
					wizardCtrl.addStep(scope);
				};
			},
			templateUrl: easyStepWizardPath + 'el/easy-step.html'
		};
	});
})(
	(function () {
		var scripts = document.getElementsByTagName("script");
		var path = scripts[scripts.length - 1].src;
		var easyStepWizardPath = path.substring(0, path.lastIndexOf('/') + 1);
		return easyStepWizardPath;
	})()
);