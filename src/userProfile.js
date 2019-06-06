var UserProfile = (function() {
    var getName = function() {
        return localStorage.getItem('username');
    };

    var setName = function(name) {
        localStorage.setItem('username',name);
    };

    var getId = function(){
        return localStorage.getItem('userId');
    };

    var setId = function(new_id){
        localStorage.setItem('userId',new_id);
    };

    return {
        getName: getName,
        setName: setName,
        getId: getId,
        setId: setId
    }

})();

export default UserProfile;