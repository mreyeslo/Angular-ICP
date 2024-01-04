import AssocList "mo:base/AssocList";
import List "mo:base/List";
import Text "mo:base/Text";

actor {
  public query func greet(name: Text) : async Text {
    return "{data:''}";
  };
  public query func test() : async Text {
    return "test from main.mo";
  };
};
