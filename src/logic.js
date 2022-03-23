function getDayName(dayNumber) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayNumber - 1];
};

function isIdValid(userId, ids, res) {
    if (isNaN(userId)) {
        res.status(404).render('schedule', { 'title': `Employee ID is not selected or the ID is not a number !` });
        return false;
    } else if (!ids.includes(userId)) {
        res.status(404).render('schedule', { 'title': `There is no employee with ID: ${userId} !` });
        return false;
    }
    return true;
};

// function isTimeValide(start_at, end_at, res) {

//     if (start_at === '' || end_at === '') {
//         res.render('schedule', { 'title': 'Error: please enter start and end time !' });
//         return false;
//     };
//     return true;
// };


module.exports = {
    getDayName: getDayName,
    isIdValid: isIdValid,
    //isTimeValide: isTimeValide
};
