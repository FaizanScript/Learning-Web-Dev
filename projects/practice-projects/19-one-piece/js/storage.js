// ================================
// CREW STORAGE
// ================================

const CREW_STORAGE_KEY = "grandlineCrew";

// get all crew members

function getCrew() {

    try {

        const crew =
            localStorage.getItem(
                CREW_STORAGE_KEY
            );

        return crew
            ? JSON.parse(crew)
            : [];

    } catch {

        return [];
    }

}

// save all crew members

function saveCrew(crew) {

    localStorage.setItem(
        CREW_STORAGE_KEY,
        JSON.stringify(crew)
    );
}