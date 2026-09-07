# my-personal-card

A static personal portfolio card for Alex Garcia, built with plain HTML, CSS, and JavaScript.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Personal details and assets

Edit [config.js](config.js) before publishing to set your location, work, education, email, social URL, text color, and image filenames. Put the matching files in [assets](assets): `profile.jpg` and the statue PNGs listed in [assets/README.md](assets/README.md).

Add client work to the `portfolioProjects` array in `config.js`:

```js
portfolioProjects: [
	{
		name: 'Client project name',
		type: 'web / identity / product',
		year: '2026',
		label: 'CLIENT WORK',
		description: 'A short description of what you made.',
		url: 'https://example.com'
	}
]
```

The public customization controls have been removed. Visitors can view and navigate the portfolio, while you retain control through the source files before publishing. Browser visitors can still technically inspect or alter their local copy through developer tools; no static website can prevent that.

The Projects tab links to separate pages for `Merlin`, `Degree Projects`, and `Coming Soon`. Each page has its own color palette and status area.
