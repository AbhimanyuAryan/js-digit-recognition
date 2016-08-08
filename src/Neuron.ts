import {Unit} from './Unit';
/**
 * File containing classes and interfaces for various types of Neurons
 *
 * @author Timur Kuzhagaliyev <tim@xaerus.co.uk>
 * @copyright 2016
 * @license https://opensource.org/licenses/mit-license.php MIT License
 * @version 0.0.2
 */

/**
 * Class representing the base neuron, used in hidden layers
 * @since 0.0.1
 */
export class Neuron {

    /**
     * Units supplied by the previous layer of neurons
     * @since 0.0.1
     */
    private inputUnits: Unit[];

    /**
     * Output unit to be supplied to the next layer of neurons
     * @since 0.0.1
     */
    private outputUnit: Unit;

    /**
     * Variable units that will be adjusted during training
     * @since 0.0.1
     */
    private variableUnits: Unit[];

    /**
     * Neuron constructor
     * @since 0.0.2 outputUnit is now an injected dependency
     * @since 0.0.1
     */
    public constructor(inputUnits: Unit[], outputUnit: Unit, variables: Unit[]) {
        this.inputUnits = inputUnits;
        this.outputUnit = outputUnit;
        this.variableUnits = variables;
    }

    /**
     * Logic for the forward pass, similar to:
     * output = ax + by + ... + cz + d
     * Where a,b,...c,d are variable units stored in the neuron and x,y,...z are values of input units
     * @since 0.0.1
     */
    public forward() {
        let output = 0;
        for(let i = 0; i < this.variableUnits; i++) {
            let coefficient = 1.0;
            if(this.inputUnits[i]) {
                coefficient = this.inputUnits[i].value;
            }
            output += coefficient * this.variableUnits[i].value;
        }
        this.outputUnit.value = output;
    }

    /**
     * Logic for the backward pass, first backdrops the gradients to the input units and then adjusts the stored
     * variable units using the step size
     * @since 0.0.1
     */
    public backward(stepSize: number) {
        for(let i = 0; i < this.variableUnits; i++) {
            let variableUnit = this.variableUnits[i];
            let coefficient = 1.0;
            if(this.inputUnits[i]) {
                let inputUnit = this.inputUnits[i];
                coefficient = inputUnit.value;
                inputUnit.gradient = variableUnit.value * this.outputUnit.gradient;
            }
            variableUnit.gradient = coefficient * this.outputUnit.gradient;
            variableUnit.value += stepSize * variableUnit.gradient;
        }
    }
}