var UserProfile = (function() {
    var full_name = "";
    var id = 0;

    var getName = function() {
        return full_name;    // Or pull this from cookie/localStorage
    };

    var setName = function(name) {
        full_name = name;
        // Also set this in cookie/localStorage
    };

    var getId = function(){
        return id;
    };

    var setId = function(new_id){
        id = new_id;
    }

    return {
        getName: getName,
        setName: setName,
        getId: getId,
        setId: setId
    }

})();

export default UserProfile;