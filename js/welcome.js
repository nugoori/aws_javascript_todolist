const goToWriteOnClickHandler = () => {
    Routes.getInstance().routeState = "todolist";
    Routes.getInstance().show();
}