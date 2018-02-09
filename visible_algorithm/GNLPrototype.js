var GNL_JS_LIB = {}
GNL_JS_LIB.object = function(o){
        function __FFF__(){};
        __FFF__.prototype = o;
        return new __FFF__();
}
//继承方法
GNL_JS_LIB.inherit = function(subType,superType){
        var _PROTOTYPE_ = GNL_JS_LIB.object(superType.prototype);
		_PROTOTYPE_.constructor = subType;
		subType.prototype = _PROTOTYPE_;
}