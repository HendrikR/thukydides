import React, {Component} from 'react';
import './App.css';
import DATA from './aspects.js'


export default class GeneratorApp_Select extends Component {
    state = {
	aspects: {},
	global: {
	    points: 100,
	    skills: 12
	},
	meta: {
	    name: "",
	    race: "",
	    job: ""
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

    onClickChar = (event, symb) => {
	const name = this.state.meta.name;
	if (name === "") {
            alert("Ein Held braucht einen richtigen Namen! Zum Beispiel «Telefonmann» oder «Orang-Utan Klaus».")
            return
	}

	if (symb === "save") {
	    console.log("Saving hero under name", name)
	    alert("Held wurde unter dem Namen «" + name + "» gespeichert. Ein eventuell vorhandener Held wurde überschrieben.")
            localStorage.setItem(name, JSON.stringify(this.state));
	} else if (symb === "load") {
	    let state = JSON.parse(localStorage.getItem(name))
	    alert("Es gibt keinen Helden namens «" + name + "» in deinem LocalStorage.")
	    if (state != null) {
		console.log("loading hero under name:", name)
		this.setState(state)
	    }
	}
    }

    onClickAsp = (event, aspId, symb) => {
	//let aspId = event.target.key
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

    onInput = (event) => {
	let key = event.target.name
	let val = event.target.value
	let meta_new = this.state.meta
	meta_new[key] = val
	this.setState({meta: meta_new})
    }

    render() {
	return (
		<div className="container">
		<div className="indicators">
		<span className="indicator">noch {this.state.global.points} Punkte zu verteilen</span><br/>
		<span className="indicator">noch {this.state.global.skills} Aspekte wählbar</span><br/>
		Laden/Speichern unter dem aktuellen Namen:<br/>
		<span className="button" onClick={(event) => this.onClickChar(event, "save")}>save</span>
		<span className="button" onClick={(event) => this.onClickChar(event, "load")}>load</span>
		</div>
		<div className="inProgress">
		Name:           <input name="name" onChange={(ev) => this.onInput(ev)} value={this.state.meta.name} /><br/>
		Rasse/Herkunft: <input name="race" onChange={(ev) => this.onInput(ev)} value={this.state.meta.race} /><br/>
		Beruf/Archetyp: <input name="job"  onChange={(ev) => this.onInput(ev)} value={this.state.meta.job } /><br/>
		<ul>
		{Object.keys(this.state.aspects).map(
		    (cat) => (<li key={cat}>{cat}<ul>{this.state.aspects[cat].map(
			(asp) => (<li className={asp.selected ? "sel" : "unsel"} key={asp.name}>
				  <span
				  onClick={(event) => this.onClickAsp(event, asp.name, "o")}
				  title={asp.desc}>{asp.name}</span>
				  <div className={asp.selected ? "vis" : "invis"}>
  				  <span className="button" onClick={(event) => this.onClickAsp(event, asp.name, "+")}>+</span>
				  <span className="button" onClick={(event) => this.onClickAsp(event, asp.name, "-")}>-</span>
				  </div>
				  <span className={asp.selected ? "vis" : "invis"}>{asp.points}</span>
				  <div className={asp.selected ? "vis" : "invis"}>
				  <span className="button" onClick={(event) => this.onClickAsp(event, asp.name, "*")} style={{marginLeft: "1em"}}>⚅</span>
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

