[![Issues][issues-shield]][issues-url]
[![GPL][license-shield]][license-url]
![Version][version-badge]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ceruleanskis/531Calculator">
    <img src="ui/public/android-chrome-192x192.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">531 Calculator</h3>

  <p align="center">
    A calculator app for 5/3/1 workouts.
    <br />
    <br />
    <a href="https://github.com/ceruleanskis/531Calculator/issues">Report Bug</a>
    ·
    <a href="https://github.com/ceruleanskis/531Calculator/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][preview]]()

This app serves as a tool to quickly calculate percentages and warmups for your 5/3/1 workout, based off of your
training max.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com)
* [React-Bootstrap](https://react-bootstrap.github.io/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

* [python 3.9+](https://wiki.python.org/moin/BeginnersGuide/Download)
* npm
  ```sh
  npm install npm@latest -g
  ```
* yarn (optional)
  ```sh
  npm install yarn@latest -g
  ```
* [docker](https://docs.docker.com/engine/install/) (optional)
* [docker-compose](https://docs.docker.com/compose/install/) (optional)

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/ceruleanskis/531Calculator.git
   ```
2. Navigate to the `ui` directory and install the NPM packages:
   ```sh
   npm install
   ```
    - Or, if using Yarn:
       ```sh
       yarn install
       ```
3. Navigate to the `server` directory and install the Python packages:
    ```sh
    python -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install --no-cache-dir -r requirements.txt
    ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->

## Usage

### Running a local development server

1. Navigate to the `ui` directory.
2. Modify the proxy configuration in the `package.json` file:
3. `"proxy": "http://localhost:5000"`
4. Serve the React app:
   ```sh
   yarn start
   ```
5. Navigate to the `server` directory.
6. Serve the Flask app:
   ```sh
   python -m flask run
   ```
7. You should see the app at [http://localhost:3000](http://localhost:3000).

### Running a local dev server via `docker-compose` (recommended)

`docker-compose -f docker-compose.dev.yml up`
You should see the app at [http://localhost:8080](http://localhost:8080).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/ceruleanskis/531Calculator/issues) for a full list of proposed features (and
known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->

## License

Distributed under the GPL 3 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments
* [Choose an Open Source License](https://choosealicense.com)
* [Font Awesome](https://fontawesome.com)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[preview]: preview.png
[issues-shield]: https://img.shields.io/github/issues/ceruleanskis/531Calculator.svg?style=for-the-badge

[issues-url]: https://github.com/ceruleanskis/531Calculator/issues

[license-shield]: https://img.shields.io/github/license/ceruleanskis/531Calculator.svg?style=for-the-badge

[license-url]: https://github.com/ceruleanskis/531Calculator/blob/master/LICENSE.txt

[version-badge]: https://img.shields.io/github/v/release/ceruleanskis/531Calculator?style=for-the-badge
