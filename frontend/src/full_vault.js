import React, {useState} from 'react';

// start planning for keeping an array of vaults for database purposes
class Vault{
    #title;
    #amount;
    #goal;

    constructor(title, amount, goal){
        this.#title = title;
        this.#amount = amount;
        this.#goal = goal;
    }
    display(){
        console.log(this.#title);
        console.log(this.#amount);
        console.log(this.#goal);
    }
    addMoney(additional){
        this.#amount += additional;
        return this.#amount
    }
}

function CreateVault(){
    const[visible, setVisibility] = useState(false);
    const[vault_input, setVault_input] = useState("");
    const[amount_input, setAmount_input] = useState("");
    const[goal_input, setGoal_input] = useState("");


    const toggle_visibility = () => {
        setVisibility(prevState => !prevState);
    };
    const submit = () => {
        const title = vault_input;
        const amount = parseFloat(amount_input) || 0;
        const goal = parseFloat(goal_input) || 0;

        const createVault = new Vault(title, amount, goal);

        setVault_input("");
        setAmount_input("");
        setGoal_input("");
        setVisibility(false);
    };
    return (
        <div className="new-vault">
            <button onClick={toggle_visibility}>
            {/*/!*    if(show_visibility){*!/*/}
            {/*/!*        setVisibility(false);*!/*/}
            {/*/!*}else{*!/*/}
            {/*/!*    setVisibility(true);*!/*/}
            {/*}*/}
                {visible ? "Cancel" : "Create New Vault"}
            </button>

            {visible && (
                <div id="create_vault">
                    <label htmlFor="vaultinput">What is this money for?</label>
                    <input
                        type="text" id="vaultinput"
                        placeholder="New House, New Car..."
                        value={vault_input}
                        onChange={(e) => setVault_input(e.target.value)}
                        />

                    <label htmlFor="amount">How much would you like to deposit upfront?</label>
                    <input
                        type="text" id="amount"
                        placeholder="$500"
                        value={amount_input}
                        onChange={(e) => setAmount_input(e.target.value)}
                        />

                    <label htmlFor="goal">How much are you looking to save?</label>
                    <input
                        type="text" id="goal"
                        placeholder="$30,000"
                        value={goal_input}
                        onChange={(e) => setGoal_input(e.target.value)}
                        />

                    <button onClick={submit} type="button">
                        Submit
                    </button>
                </div>
                )}
        </div>
    );

}

export default CreateVault;