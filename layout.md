<body class="full-window"> // height: 100%;
	<div class="window-container"> // height: 100%; flex-column
		<app-bar>
		<progress-bar>
		<div class="app-container"> // height: 0px; flex 1 1 --> takes rest of vertical space
			<div class="layout-container"> // height: 100%; flex-column
				<inventory>
				<div class="tabs"> 
					<div class="tabs-container> // height: 100%; flex-colum
						<tabs-nav-bar>
						<div class="tabs-content"> // height: 700px; overflow: auto
							<div class="decks-tab-container"> // height: 100%; flex-column
								<table-menu> 		// flex 0 1 auto
								<table-container>	// flex 1 1 auto, height: 700px, overflow: auto
								<paginator>			// flex 0 1 auto, padding-top
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>