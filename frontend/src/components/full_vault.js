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
    getTitle(){
        return this.#title;
    }
    getAmount(){
        return this.#amount;
    }
    getGoal(){
        return this.#goal;
    }
}

function createVault(){
    const[visible, setVisibility] = useState(false);
    const[vault_input, setVault_input] = useState("");
    const[amount_input, setAmount_input] = useState("");
    const[goal_input, setGoal_input] = useState("");
    const[vaults, setVaults] = useState([]);
    const[additional_input, set_additional_input] = useState({});


    const toggle_visibility = () => {
        setVisibility(prevState => !prevState);
    };
    const submit = () => {
        const title = vault_input;
        const amount = parseFloat(amount_input) || 0;
        const goal = parseFloat(goal_input) || 0;

        const newVault = new Vault(title, amount, goal);

        setVault_input("");
        setAmount_input("");
        setGoal_input("");
        setVisibility(false);
    };

    const deposit = (index) => {
        const additional_amount = parseFloat(additional_input[index]) || 0;
        setVaults((prevVaults) => {
            const update = [...prevVaults];
            update[index].addMoney(additional_amount);
            return update;
        });
        set_additional_input("");
    };




    return (
        <div className="new-vault">
            <button onClick={toggle_visibility}>
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

        //display already created vaults i hope
        <div className = "createdvaults">
            {vaults.map((vault, index) => (
                <div key={index} className="vault">
                    <h3>{vault.getTitle()}</h3>
                    <p>Current Amount: ${vault.getAmount()}</p>
                    <p>Goal: ${vault.getGoal()}</p>
                    <div>
                        <label htmlFor={`deposit-${index}`}>Make A Deposit:</label>
                        <input
                            type="text"
                            id={`deposit-${index}`}
                            placeholder="Enter deposit amount"
                            value={additional_input[index]}
                            onChange={(e) => set_additional_input(e.target.value)}))}
                        />
                        <button onClick={() => deposit(index)}>Finalize Deposit</button>
                    </div>
                </div>
            ))}
        </div>




        </div>
    );

}

export default createVault;