import React, {Component} from 'react';
import './App.css';


export default class GeneratorApp_Select extends Component {
    state = {
	aspects: {
	    "Kampf": [
		{ name: "Reiterkampf", desc: "Kann von Reittieren oder Motorrad aus Leute verprügeln."},
		{ name: "Meisterschütze", desc: "Kann sehr gut mit modernen Schusswaffen umgehen, insbes. auf große Entfernungen"},
		{ name: "Tödliche Hände", desc: "Hat Erfahrung im unbewaffneten Nahkampf"},
		{ name: "Schwertmeister", desc: "Hat Erfahrung im bewaffneten Nahkampf"},
		{ name: "High-Tech-Waffen", desc: "Umgang mit Strahlenwaffen & größeren Waffensystemen"},
		{ name: "Zenturio / Taktiker", desc: "Erfahrung im Führen kleiner Gruppen (<60 Mann) in Konfliktsituationen"},
		{ name: "Gunslinger", desc: "beidh. Schießen, Combat-Schießen auf geringe Distanzen, Schnellschüsse etc."},
	    ],
	    "Körperliches": [
		{ name: "Athletik / Körperbeherrschung", desc: "Kann besser rennen, springen, schwimmen als seine Mitmenschen"},
		{ name: "Eisenbieger", desc: "Ist überdurchschnittlich stark. Kann viel tragen, hart zuschlagen etc."},
		{ name: "Außergewöhnliche Körpergröße", desc: "groß (mehr Kraft & Reichweite); klein (Bonus auf Verstecken, flink)"},
		{ name: "Widerstand gegen Elemente", desc: "Aufgrund von Haut o.ä."},
		{ name: "Konstitution / Widerstand", desc: "Fähigkeit, Schaden zu widerstehen"},
		{ name: "Regeneration", desc: "Verbesserte Regeneration von Schaden"},
		{ name: "Sinnesschärfe / Intuition", desc: "Kann überdurchschnittlich gut sehen, hören, riechen o.ä."},
	    ],
	    "Gesellschaft": [
		{ name: "Verführer / Attraktivität", desc: "Große Anziehungskraft aufs andere Geschlecht"},
		{ name: "Rockstar", desc: "Hat großes Charisma, kann Leute schnell von sich einnehmen und überzeugen"},
		{ name: "Taschenspieler / Meisterdieb", desc: "Kann unbemerkt Gegenstände entwenden etc."},
		{ name: "Unauffälligkeit / »Bin nicht da«", desc: "Kann sich gut verstecken und ungesehen bewegen"},
		{ name: "Schnüffler", desc: "Kann gut Leute ausfragen und recherchieren"},
		{ name: "Empathie / Emo-Intelligenz", desc: "Kann sich in andere hineinversetzen"},
		{ name: "Lügen/Eloquenz", desc: ""},
		{ name: "Diplomat"},
		{ name: "Handelsgeschick"},
		{ name: "Organisation / Führung", desc: ""},
		{ name: "Mut", desc: ""},
	    ],
	    "Natur und Fortbewegung": [
		{ name: "Pilot", desc: "Ausgezeichnete Fähigkeiten im Atmosphärenflug und im Orbit"},
		{ name: "Bergvagabund", desc: "Kann außergewöhnlich gut klettern."},
		{ name: "Überlebenskünstler / Jäger", desc: "Versteht es, in wilder Umgebung zu überleben"},
		{ name: "Sailnator", desc: "Kennt sich mit Wasserfahrzeugen und (irdischer) Navigation aus"},
		{ name: "Rennfahrer", desc: "Kann Bodenfahrzeuge schnell & effizient bewegen."},
		{ name: "Navigation / Orientierungssinn"},
		{ name: "Tierfreund", desc: "Kann gut mit Tieren umgehen"},
	    ],
	    "Handwerk": [
		{ name: "Chefkoch", desc: "Kann aus einfachen Zutaten leckere Mahlzeiten zaubern"},
		{ name: "Sprengmeister", desc: "Kennt sich mit Sprengstoffen aus und kann sie effektiv einsetzen"},
		{ name: "»Ich komme überall rein«", desc: "Kann mechanische und (einfache) elektronische Sicherheitssysteme überwinden"},
		{ name: "Hackerman", desc: "Kann komplexe elektronische Sicherheitssysteme überwinden"},
		{ name: "Mechaniker / Handwerker", desc: "Tut wie er heißt"},
		{ name: "Visueller Künstler (Maler, Bildhauer)"},
		{ name: "1. Hilfe / Feldmediziner", desc: "Kann Wunden, Traumata etc. behandlen"},
	    ],
	    "Wissen ": [
		{ name: "Sprachgenie", desc: "Beherrscht viele Sprachen und kann sich schnell neue aneignen"},
		{ name: "»Wie damals 78 bei Plataea!«", desc: "Außergewöhnliches Geschichtswissen. Weiß zu jeder Situation ein mehr oder minder passendes historisches Beispiel zu nennen."},
		{ name: "Naturwissenschaftler /  Forscher", desc: "Kennt sich gut mit Naturwissenschaften aus"},
		{ name: "Giftmischer", desc: "weiß um Herstellung, Einsatz und Wirkung von Giften"},
		{ name: "Pharmazeutisches Wissen"},
		{ name: "Logik"},
		{ name: "Anatomie / Xenobiologie", desc: "Kann Wunden, Traumata etc. behandlen"},
		{ name: "Okkultist", desc: "Kennt sich mit Theorie und Geschichte übersinnlicher Dinge aus"},
	    ],
	    "Übersinnliches": [
		{ name: "Göttergünstling"},
		{ name: "Missionar"},
		{ name: "Halbdämon / Demi-Goltar"},
		{ name: "Halbgott / Demi-Eldar"},
		{ name: "Vampir", desc: "ernährt sich von Blut, Energie o.ä."},
		{ name: "Astralgespür / Magiekunde"},
		{ name: "Unerschütterlicher Wille / Selbstbeherrschung / Geduld / Seelenruhe"},
	    ],
	    "Kits / Berufe": [
		{ name: "Kopfgeldjäger"},
		{ name: "Widerstandskämpfer"},
		{ name: "Prospektor / Geologe"},
		{ name: "Hydroponiker"},
		{ name: "Freibeuter / Weltraumpirat"},
		{ name: "Sammler"},
		{ name: "Krieger / Soldat"},
		{ name: "Vagabund"},
		{ name: "Mutant"},
		{ name: "Maschine", desc: "Der Charakter ist kein biologisches Lebewesen, sondern eine konstruierte Maschine."},
	    ]
	},
	global: {
	    points: 100,
	    skills: 12
	}
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
	    //for (let cat in this.state.aspects) {
	    let guhl = this.state.aspects[cat].filter((asp) => {
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
	    aspects_new[cat] = guhl;
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

