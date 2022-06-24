import React from "react";

function AbilityItem(props) {
  return (
    <div>{props.ability.ability.name}</div>
  );
}

class PokemonGenerator extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      speciesName: null,
      abilitiesAll: [],
      imgPokemonURL: null,
      activeProfile: true,
    }
  }

  getNewPokemon () {
    // getting a pokemon number 1-898 (max number)
    const randomNumber = Math.ceil(Math.random() * 898)
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
    // creating a API request
    fetch(url)
    // processing the promis response
      .then(response => response.json())
      .then(data => {
        this.setState({
          // updating the values 
          speciesName: data.species.name,
          abilitiesAll: data.abilities,
          imgPokemonURL: data.sprites.other['official-artwork'].front_default,
          activeProfile: false,
        })
      })
  }

  render() {

    // looping through the abilities array
    const abilitiesPokemon = this.state.abilitiesAll.map( (ability,index) => {
      return <AbilityItem key={index} ability={ability}/>
    })

    return (
      <div>
        <h1>Random Pokemon Generator</h1>
        {/* if the loading of the image didnt work dont show anything */}
        { this.state.imgPokemonURL && 
          <div>
            <h3>{this.state.speciesName}</h3> 
            <h4>Abilities: 
              <small>{abilitiesPokemon}</small> 
            </h4>
            <img src={this.state.imgPokemonURL} alt="" height={400}/>
          </div>
        }
        { this.state.activeProfile && // displlayed only once // will be hidden after the button gets pressed
          <h2>Press the button to generate a radnom Pokemon</h2>  
        }
        <button 
          type='button'
          className='btn'
          onClick={ () => this.getNewPokemon()}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          GENERATE
        </button>
      </div>
    )
  }

}

export default PokemonGenerator;