import React, {Component} from 'react';
import './App.css';
import DATA from './aspects.js'


export default class GeneratorApp_Select extends Component {
    state = {
	aspects: {},
	global: {
	    points: 100,
	    skills: 12
	}
    }

    constructor() {
	super()
	this.state.aspects = DATA.aspects
    }

    rollDice(value) {
	let roll = Math.round(Math.random()*20) + 1
	return value - roll
    }
    
    onClick = (event, aspId, symb) => {
	let points = this.state.global.points
	let skills = this.state.global.skills
	let aspects_new = {}

	Object.keys(this.state.aspects).forEach((cat) => {
	    aspects_new[cat] = this.state.aspects[cat].filter((asp) => {
		if (aspId === asp.name) {
		    if (symb === "o") {
			if (asp.selected) {
			    asp.selected = false
			    points += asp.points
			    skills += 1
			} else if (skills > 0) {
			    asp.selected = true
			    asp.roll = null
			    asp.points = 1
			    points -= asp.points
			    skills -= 1
			}
		    } else if (asp.selected && symb === "+" && points > 0) {
			asp.points += 1
			points -= 1
		    } else if (asp.selected && symb === "-" && asp.points > 0) {
			asp.points -= 1
			points += 1
  			if (asp.points === 0) {
			    asp.selected = false
			    skills += 1
			}
		    } else if (asp.selected && symb === "*") {
			asp.roll = this.rollDice(asp.points);
		    }
		}
		return asp
	    });
	})
	
	this.setState({aspects: aspects_new,
		       global: {skills: skills, points: points}
		      })
    }
    
    
    render() {
	console.log("re-render")
	return (
		<div className="container">
		<div className="indicators">
		<span className="indicator">{this.state.global.points} points left to distribute</span>
		<span className="indicator">{this.state.global.skills} skills left to select</span>
		</div>
		<div className="inProgress">
		<ul>
		{Object.keys(this.state.aspects).map(
		    (cat) => (<li key={cat}>{cat}<ul>{this.state.aspects[cat].map(
			(asp) => (<li className={asp.selected ? "sel" : "unsel"} key={asp.name}>
				  <span
				  onClick={(event) => this.onClick(event, asp.name, "o")}
				  title={asp.desc}>{asp.name}</span>
				  <div className={asp.selected ? "vis" : "invis"}>
  				  <span className="button" onClick={(event) => this.onClick(event, asp.name, "+")}>+</span>
				  <span className="button" onClick={(event) => this.onClick(event, asp.name, "-")}>-</span>
				  </div>
				  <span className={asp.selected ? "vis" : "invis"}>{asp.points}</span>
				  <div className={asp.selected ? "vis" : "invis"}>
				  <span className="button" onClick={(event) => this.onClick(event, asp.name, "*")} style={{marginLeft: "1em"}}>⚅</span>
				  <span key={cat}>{asp.roll}</span>
				  </div>
				  </li>))}</ul></li>)
		)}
	    </ul>
		</div>
		<h2>Verletzungsstatus</h2>
		<div className="container"><ul>
		<li title="">unverletzt</li>
		<li title="leichte Einbußen (-2) auf passende Aspekte">leicht verletzt</li>
		<li title="größere Einbußen (-5) auf weitere Aspekte">mittel verletzt</li>
		<li title="starke Einbußen (-8) auf alle Aspekte. Keine aktive Teilnahme am Kampf. Einfache Tätigkeiten (Notruf absetzen) möglich. Tod innerhalb von 4-8 Stunden.">schwer verletzt</li>
		<li title="Komplett handlungsunfähig. Ohne 1. Hilfe Tod innerhalb von 15 Minuten.">handlungsunfähig</li>
		</ul></div>
		</div>
	)

   	
    }
}

