{% definition %}
Runtime polymorphism is a feature that allows a call to an overridden method to be resolved at runtime rather than compile time.
{% /definition %}

{% important %}
Remember `virtual` and `override` keywords in C#.
{% /important %}

{% example %}
class Animal {
  public virtual void Speak() { Console.WriteLine("..."); }
}

class Dog : Animal {
  public override void Speak() { Console.WriteLine("Woof"); }
}
{% /example %}

{% exam marks="2" %}
Define runtime polymorphism.
{% /exam %}

{% quiz question="Which keyword enables method overriding?" answer="B" %}
- A. static
- B. virtual
- C. sealed
- D. private
{% /quiz %}
