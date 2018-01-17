
const NotesEditor = React.createClass({

	getInitialState() {
		return {
			text: ''
		}
	},

	handleTextChange(e) {
		this.setState({
			text: e.target.value
		})
	},

	handleAdd() {

		const newNote = {
			id: Math.random(),
			text: this.state.text,
			color: 'yellow'
		}

		this.props.handleNoteAdd(newNote)

		this.resetState()
	},

	resetState() {
		this.setState({ text: '' })
	},

	render() {

		const { text } = this.state

		return (
			<div>
				<textarea
					rows='5'
					value={ text }
					onChange={ this.handleTextChange }
				/>
				<button
					onClick={ this.handleAdd }
					disabled={ !text }
				>
					Add
				</button>
			</div>
		)
	}
})

const Note = React.createClass({

	render() {

		const { color, children } = this.props

		return (
			<div style={ { backgroundColor: color } }>
				{ children }
			</div>
		)
	}
})

const NotesGrid = React.createClass({

	render() {

		const { notes } = this.props

		return (
			<div>
				{
					notes && notes.length ? notes.map(note => {
						return (
							<Note
								key={ note.id }
								color={ note.color }
							>
								{ note.text }
							</Note>
						)
					}) : <p>Заметок нет</p>
				}
			</div>
		)
	}
})

const NotesApp = React.createClass({

	getInitialState() {
		return {
			notes: [
				{ id: 'g54gv54g657cd', color: 'yellow', 'text': 'Text form note' }
			]
		}
	},

	handleNoteAdd(newNote) {

		console.log(newNote)

		this.setState({
			notes: [
				...this.state.notes,
				newNote
			]
		})
	},

	render() {

		return (
			<div>
				<h2>NotesApp</h2>
				<NotesEditor handleNoteAdd={ this.handleNoteAdd } />
				<NotesGrid notes={ this.state.notes } />
			</div>
		)
	}
})

ReactDOM.render(
	<NotesApp />,
	document.getElementById('root')
)