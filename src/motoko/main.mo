import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import StableMemory "mo:base/ExperimentalStableMemory";

actor {
  stable var myList : [Int] = [];
  let map = HashMap.HashMap<Text, Item>(5, Text.equal, Text.hash);
  public type Item = {
    id : Text;
    content : Text;
  };

  public query func greet(name : Text) : async Text {
    return "success";
  };
  public query func test() : async Text {
    return "test from main.mo";
  };

  public query func addItem(item : Item) : async ?Item {
    log(item.id);
    map.put(item.id, item);
    map.get(item.id);
  };

  public query func getAll() : async [Text] {
    readLast(1);
  };
  func ensure(offset : Nat64) {
    let pages = (offset + 65536) >> 16;
    if (pages > StableMemory.size()) {
      let oldsize = StableMemory.grow(pages - StableMemory.size());
      assert (oldsize != 0xFFFF_FFFF_FFFF_FFFF);
    };
  };

  stable var base : Nat64 = 0;

  func log(t : Text) {
    let blob = Text.encodeUtf8(t);
    let size = Nat64.fromNat(blob.size());
    ensure(base + size + 4);
    StableMemory.storeBlob(base, blob);
    base += size;
    StableMemory.storeNat32(base, Nat32.fromNat(blob.size()));
    base += 4;
  };

  func readLast(count : Nat) : [Text] {
    let a = Array.init<Text>(count, "");
    var offset = base;
    var k = 0;
    while (k < count and offset > 0) {
      offset -= 4;
      let size = StableMemory.loadNat32(offset);
      offset -= Nat64.fromNat(Nat32.toNat(size));
      let blob = StableMemory.loadBlob(offset, Nat32.toNat(size));
      switch (Text.decodeUtf8(blob)) {
        case (?t) { a[k] := t };
        case null { assert false };
      };
      k += 1;
    };
    return Array.tabulate<Text>(k, func i { a[i] });
  };
};
