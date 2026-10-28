import "./App.css";
import { Routes, Route } from "react-router-dom";
import EventCardView from "@/features/event-card/views/EventCardView";
import OddsBoosterWidgetView from "@/features/odds-booster-widget/views/OddsBoosterWidgetView";
import { APP_ROUTES } from "@/routes";

function App() {
    return (
        <Routes>
            <Route path={APP_ROUTES.eventCard} element={<EventCardView />} />
            <Route path={APP_ROUTES.oddsBoosterWidget} element={<OddsBoosterWidgetView />} />
        </Routes>
    );
}

export default App;
